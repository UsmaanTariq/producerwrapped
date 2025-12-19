import { createClient } from "@/utils/supabase/client";
import { getProducerStats } from "../stats/getProducerStats";

export async function calculateGoalProgress(goal: any, userId: string) {
    const supabase = createClient()
    let currentValue = 0

    switch (goal.goal_type) {
        case 'total_streams':
            const stats = await getProducerStats(userId)
            currentValue = stats.totalStreams.total
            break
        
        case 'role_streams':
            const roleStats = await getProducerStats(userId)
            const roleData = roleStats.streamsByRole.find((r: any) => r.role === goal.role)
            currentValue = roleData?.total_streams || 0
            break

        case 'track_count':
            const {data: userTracks} = await supabase
                .from('user_tracks')
                .select('id', { count: 'exact' })
            
                currentValue = userTracks?.length || 0
                break
    }

    return currentValue
}

export async function updateGoalProgress(goalId: string, userId: string) {
    const supabase = createClient()

    const {data: goal, error: goalError} = await supabase
        .from('goals')
        .select('*')
        .eq('id', goalId)
        .single()
    
        if (goalError || !goal) {
            throw new Error('Goal not found')
        }

        if (goal.status === "completed") {
            console.log("This task is completed")
            return
        }

        const currentValue = await calculateGoalProgress(goal, userId)

        const isCompleted = currentValue >= goal.target_value
        const status = isCompleted ? 'completed' : 'active'

        // Verify the goal belongs to the user
        if (goal.user_id !== userId) {
            throw new Error('Unauthorized to update this goal')
        }

        const { data, error } = await supabase
            .from('goals')
            .update({
                current_value: currentValue,
                status: status,
                completed_at: isCompleted ? new Date().toISOString() : null,
                updated_at: new Date().toISOString()
            })
            .eq('id', goalId)
            .select()
            .single()
        
        if (error) {
            console.error('Error updating goal:', error)
            throw error
        }

        return data
    
}