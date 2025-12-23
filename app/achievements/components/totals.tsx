interface TotalsProps {
    totalStreams: number
    youtubeStreams: number
    spotifyStreams: number
}

const Totals = ({ totalStreams, youtubeStreams, spotifyStreams }: TotalsProps) => {
    return (
        <>
            <div className="flex gap-2 items-center justify-center w-full p-2 py-4 ">
                <div className="flex border border-gray-300 rounded-xl p-8 bg-white shadow-md w-1/3">
                    <h1 className="text-xl">Total Streams: {totalStreams.toLocaleString()}</h1>
                </div>
                <div className="flex border border-gray-300 rounded-xl p-8 bg-white shadow-md w-1/3">
                    <h1 className="text-xl">Spotify Streams: {spotifyStreams.toLocaleString()}</h1>
                </div>
                <div className="flex border border-gray-300 rounded-xl p-8 bg-white shadow-md w-1/3">
                    <h1 className="text-xl">YouTube Streams: {youtubeStreams.toLocaleString()}</h1>
                </div>
            </div>
        </>
    )
}

export default Totals;