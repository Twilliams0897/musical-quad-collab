export class Song {
	constructor(
		public song_id: number,
		public title: string,
		public artist: string,
		public year: string,
		public web_url: string,
		public img_url: string,
		public clicks: number
	) {}
}
