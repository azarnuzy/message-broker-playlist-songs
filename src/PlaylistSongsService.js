const { Pool } = require('pg')

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool()
  }

  async getSongsByPlaylistId(id) {
    const query = {
      text: 'SELECT s.id, s.title, s.performer FROM playlist_songs p JOIN songs s ON p.song_id=s.id WHERE p.playlist_id = $1',
      values: [id],
    }

    const result = await this._pool.query(query)

    return result.rows
  }

  async getPlaylistById(id) {
    const query = {
      text: `SELECT playlists.id, playlists.name FROM playlists
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [id],
    }

    const result = await this._pool.query(query)

    return result.rows[0]
  }
}

module.exports = PlaylistSongsService
