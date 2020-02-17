// 歌曲的构造函数
export default class Song{
    constructor({id,mid,singer,name,album,image}){
        this.id=id;
        this.mid=mid
        this.singer = singer
        this.name=name
        this.album=album
        this.image=image
    }
}

// 方法复用，复用上面的构造函数
export function settingSong(musicData){
    return new Song({
        id:musicData.id,
        singer:musicData.ar[0].name,
        name:musicData.name,
        album:musicData.name,
        image:musicData.al.picUrl
    })
}