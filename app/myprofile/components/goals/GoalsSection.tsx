'use client'

import { useUserGoals } from "@/hooks/useUserGoals"
import GoalsCard from "./GoalsCard"

const GoalsSection = () => {
    const { user, userGoals, loading, error} = useUserGoals()

    if (loading) {
        return (
            <>
                <p>Loading...</p>
            </>
        )
    } 

    if (error) {
        return (
            <p>Error</p>
        )
    }

    if (!userGoals || userGoals.length === 0) {
        return (
            <div className="flex justify-center p-8">
                <p className="text-gray-500">No goals yet. Create your first goal!</p>
            </div>
        )
    }

    return (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-8">
                {userGoals.map((goal: any) => (
                    <GoalsCard 
                        key={goal.id}
                        title={goal.title}
                        description={goal.description}
                        periodStart={goal.period_start}
                        periodEnd={goal.period_end}
                        currentValue={goal.current_value || 0}
                        targetValue={goal.target_value || 100}
                        goalType={goal.goal_type}
                    />
                ))}
            </div>
        
    )
}

export default GoalsSection