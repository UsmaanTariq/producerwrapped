const Track = ({track_name, artist_name, created_at, album_name, popularity}: {track_name : string, artist_name: string, created_at: string, album_name: string, popularity: number}) => {
    return (
        <>
            <div className="flex flex-col border-2 rounded-lg p-4">
                <h1 className="text-xl font-bold">{track_name} - {album_name}</h1>
                <h2>{artist_name}</h2>
                <p>Popularity - {popularity}</p>
            </div>
        </>
    )
}

export default Track;