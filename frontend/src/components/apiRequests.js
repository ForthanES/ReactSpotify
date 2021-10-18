const apiRequests = (req, res) => {
  //TRACK INFO
  const reqTrack = (res) =>
    res.body.tracks.items.map((track) => {
      const smallestAlbumImage = track.album.images.reduce(
        (smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        },
        track.album.images[0]
      );
      return {
        //General
        title: track.name,
        uri: track.uri,
        href: track.href,
        duration: track.duration_ms,
        preview: track.preview_url,
        //Album
        albumName: track.album.name,
        release: track.album.release_date,
        albumUrl: smallestAlbumImage,
        bigImg: track.album.images[0],
        //Artist
        artist: track.artists[0].name,
        artistUri: track.artists[0].uri,
      };
    });
  //ALBUM INFO
  const reqAlbum = (res) =>
    res.body.albums.items.map((album) => {
      const smallestAlbumImage = album.images.reduce((smallest, image) => {
        if (image.height < smallest.height) return image;
        return smallest;
      }, album.images[0]);
      return {
        //Album
        title: album.name,
        uri: album.uri,
        href: album.href,
        duration: album.duration_ms,
        preview: album.preview_url,
        albumName: album.name,
        release: album.release_date,
        numTracks: album.total_tracks,
        albumUrl: smallestAlbumImage,
        bigImg: album.images[0],
        artist: album.artists[0].name,
        artistUri: album.artists[0].uri,
      };
    });

  const reqArtist = (res) =>
    res.body.artists.items.map((artist) => {
      const smallestAlbumImage = artist.images.reduce((smallest, image) => {
        if (image.height < smallest.height) return image;
        return smallest;
      }, artist.images[0]);
      return {
        //Artist
        title: artist.name,
        uri: artist.uri,
        href: artist.href,
        followers: artist.followers.total,
        genres: artist.genres,
        albumUrl: smallestAlbumImage,
        bigImg: artist.images[0],
      };
    });

  if (req === 'Artist') {
    return reqArtist(res);
  } else if (req === 'Album') {
    return reqAlbum(res);
  } else {
    return reqTrack(res);
  }
};

export default apiRequests;
