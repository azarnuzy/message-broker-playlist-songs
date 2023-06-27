class Listener {
  constructor(playlistSongsService, mailSender) {
    this._playlistSongsService = playlistSongsService
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen(message) {
    try {
      const { targetEmail, playlistId } = JSON.parse(message.content.toString())
      const songs = await this._playlistSongsService.getSongsByPlaylistId(
        playlistId
      )
      let playlist = await this._playlistSongsService.getPlaylistById(
        playlistId
      )

      playlist = {
        playlist: {
          ...playlist,
          songs,
        },
      }

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlist)
      )

      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Listener
