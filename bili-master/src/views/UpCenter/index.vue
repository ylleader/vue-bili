<template>
    <div class="up-center">
        <BannerImg></BannerImg>
        <AvatarCrop></AvatarCrop>

        <!-- <video autoplay style="width:400px" :src="src" controls ref="v"></video>
        <button @click="clickv">添加v</button>
        <button @click="clicka">添加a</button>

        <input type="file" ref="file" multiple="true" @change="testCanvas">


        <img v-for="(img, i) in imgs" :key="i" :src="img">
       -->


    </div>
</template>

<script>

import AvatarCrop from '@/components/AvatarCrop'
import BannerImg from '@/components/Header/Banner/BannerImg'


import axios from 'axios'
import mp4box from 'mp4box'

// import mod from '@ffmpeg/ffmpeg'
// import ffmpegjs from '@ffmpeg/core'

// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import videoScreenshot from '@/utils/videoScreenshot.js'



export default {
    name: 'UpCenter',
    components: { BannerImg, AvatarCrop },
    data() {
        return {
            src: '',
            vi: 1,
            ai: 1,
            imgs: [],
            isrc:''
        }
    },
    methods: {
        clickv() {

            this.ax(`/video/ndmz/chunk-stream0-0000${this.vi++}.m4s`).then(res => {
                this.sourceBufferv.appendBuffer(res.data)
            })
            this.ax(`/video/ndmz/chunk-stream1-0000${this.ai++}.m4s`).then(res => {
                this.sourceBuffera.appendBuffer(res.data)
            })
        },
        clicka() {
            this.i || (this.i = 1)
            videoScreenshot({ file: this.$refs.file.files[0], time: this.i, result: this.imgs }).then(res => {
                // this.imgs = res
            })
            this.i+=10
        },
        mx(data) {
            return new Promise((res, rej) => {
                const mp4boxfile = mp4box.createFile();
                mp4boxfile.onError = e => rej(e);
                mp4boxfile.onReady = info => {
                    console.log(info)

                    res(info.mime)
                };
                data.fileStart = 0
                mp4boxfile.appendBuffer(data);
            })
        },
        ax(url) {
            return axios.get(url, { responseType: 'arraybuffer' })
        },
        init() {

            this.mediaSource = new MediaSource();
            this.src = URL.createObjectURL(this.mediaSource);

            this.mediaSource.addEventListener('sourceopen', async () => {
                const { data: datav } = await this.ax('/video/ndmz/init-stream0.m4s')
                const { data: dataa } = await this.ax('/video/ndmz/init-stream1.m4s')
                const mimev = await this.mx(datav)
                const mimea = await this.mx(dataa)
                this.sourceBufferv = this.mediaSource.addSourceBuffer(mimev)
                this.sourceBuffera = this.mediaSource.addSourceBuffer(mimea)
                this.sourceBufferv.appendBuffer(datav)
                this.sourceBuffera.appendBuffer(dataa)
            })

            this.$refs.v.addEventListener('play', () => {
                console.log('play')
            })
            this.$refs.v.addEventListener('waiting', () => {
                console.log('waiting')
            })
            this.$refs.v.addEventListener('error', () => {
                console.log('error')
            })
            this.$refs.v.addEventListener('loadedmetadata', () => {
                console.log('loadedmetadata')
            })
            this.$refs.v.addEventListener('durationchange', () => {
                console.log('durationchange')
                console.log(this.$refs.v.duration)

            })

        },
        getImg() {
            try {
                var process = new ffmpeg('/path/to/your_movie.avi');
                process.then(function (video) {
                    video.fnExtractFrameToJPG('/path/to/save_your_frames', {
                        frame_rate: 1,
                        number: 5,
                        file_name: 'my_frame_%t_%s'
                    }, function (error, files) {
                        if (!error)
                            console.log('Frames: ' + files);
                    });
                }, function (err) {
                    console.log('Error: ' + err);
                });
            } catch (e) {
                console.log(e.code);
                console.log(e.msg);
            }
        },
        reader(file, fnc) {
            const chunkSize = 1024 * 1024 * 5; // 1 MB chunk
            // const file = '' // the file to read
            const fileSize = file.size;

            let offset = 0;
            let chunkReaderBlock = null;

            const readEventHandler = (evt) => {
                if (evt.target.error == null) {
                    offset += evt.target.result.byteLength;
                    console.log(offset)
                } else {
                    console.error("Read error: " + evt.target.error);
                    return;
                }
                if (offset >= fileSize) {
                    console.log("Done reading file");
                    return;
                }

                fnc(evt.target.result).then(res => {
                    chunkReaderBlock(offset, chunkSize, file);
                })

            };

            chunkReaderBlock = (_offset, length, _file) => {
                let r = new FileReader();
                let blob = _file.slice(_offset, length + _offset);
                r.onload = readEventHandler;
                r.readAsArrayBuffer(blob);
            };

            chunkReaderBlock(offset, chunkSize, file);

        },
        async test(e) {

            let i = 1
            let num = 60

            const fnc = async (buffer) => {
                i++
                const ffmpeg = mod.createFFmpeg({ log: true })
                !ffmpeg.isLoaded() && await ffmpeg.load();
                ffmpeg.FS('writeFile', `input.mp4`, await mod.fetchFile(buffer));
                await ffmpeg.run(
                    '-i',
                    `input.mp4`,
                    '-vf',
                    'fps=1/1',
                    '-q:v',
                    '2',
                    '-threads',
                    '16',
                    `a%d.jpg`
                );

                const data = ffmpeg.FS('readFile', `a1.jpg`);

                const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/jpg' }));
                // 触发下载
                const link = document.createElement('a');
                link.href = url;
                link.download = 'out.jpg';
                link.click();
                ffmpeg.exit();
            }

            !this.fs && (this.fs = [])
            this.fs.push(this.$refs.file.files[0])

            if (this.fs.length == 2) {
                this.fs.forEach(file => {
                    fnc(file)
                });
            }

            // this.reader(this.$refs.file.files[0], fnc)


        },
        testCanvas() {

            // const video = document.createElement('video')


            videoScreenshot({file:this.$refs.file.files[0],sub: 5, result: this.imgs}).then(res=>{
                // this.imgs = res
            })
        }
    },
    mounted() {
        // this.init()
    },
    beforeDestroy() {
  
    }
}
</script>

<style lang="scss" scoped>
.up-center {
    // height: 3000px;

    img {
        width: 320px;
        // height: 180px;
    }

    .box {
        height: 100px;
        width: 100px;
        background-color: red;
        color: red;
    }
}
</style>