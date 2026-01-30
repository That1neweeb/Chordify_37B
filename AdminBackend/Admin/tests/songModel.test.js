const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const SongMock = dbMock.define('Song', {
   id: 1,
  title: "Wonderwall",
  artist: "Oasis",
  strummingPattern: "DDUUD",
  difficulty: "easy",
  cover_image: "uploads/wonderwall.jpg",
  content: {
    lyrics: "Today is gonna be the day...",
    chords: [
      { position: 0, chord: "G" },
      { position: 6, chord: "D" }
    ]
  }
});

describe('Song Model', () => {
    it('should create a song', async() => {
        const song = await SongMock.create({
            title: "Wonderwall",
            artist: "Oasis",
            strummingPattern: "DDUUD",
            difficulty: "easy",
            cover_image: "uploads/wonderwall.jpg",
            content: {
              lyrics: "Today is gonna be the day...",
              chords: [
                { position: 0, chord: "G" },
                { position: 6, chord: "D" }
              ]
            }
        });

        expect(song.title).toBe('Wonderwall');
        expect(song.artist).toBe('Oasis');
        expect(song.strummingPattern).toBe('DDUUD');
        expect(song.difficulty).toBe('easy');
        expect(song.cover_image).toBe('uploads/wonderwall.jpg');
        expect(song.content.lyrics).toBe('Today is gonna be the day...');
        expect(song.content.chords[0].position).toBe(0);
        expect(song.content.chords[0].chord).toBe('G');
        expect(song.content.chords[1].position).toBe(6);
        expect(song.content.chords[1].chord).toBe('D');
    });

    it('should require all fields', async() => {

        const song = await SongMock.create({});

        // Default values come from the mock definition
        expect(song.title).toBe('Wonderwall');
        expect(song.artist).toBe('Oasis');
        expect(song.strummingPattern).toBe('DDUUD');
        expect(song.difficulty).toBe('easy');
        expect(song.cover_image).toBe('uploads/wonderwall.jpg');
        expect(song.content.lyrics).toBe('Today is gonna be the day...');
        expect(song.content.chords[0].position).toBe(0);
        expect(song.content.chords[0].chord).toBe('G');
        expect(song.content.chords[1].position).toBe(6);
        expect(song.content.chords[1].chord).toBe('D');

        // await expect(SongMock.create({})).rejects.toThrow();
    });
});