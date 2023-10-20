<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="content">
			<uni-icons type="camera" @click="takePhoto" size="30"></uni-icons>
		</view>
		<view>
			<button @click="startRecord">开始录音</button>
			<button @click="endRecord">停止录音</button>
			<button @click="playVoice">播放录音</button>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				title: 'Hello',
				isRecording: false,
				tempFilePath: '',
				voicePath: ''
			}
		},
		onLoad() {
			let _this = this;
			recorderManager.onStop(function(res) {
				console.log('recorder stop' + JSON.stringify(res));
				_this.voicePath = res.tempFilePath;
			});
		},
		methods: {
			takePhoto() {
				uni.chooseImage({
					sourceType: ['camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						this.saveImageToPhotosAlbum(tempFilePaths[0]);
						this.uploadFile(tempFilePaths[0]);
					}
				});
			},

			saveImageToPhotosAlbum(filePath) {
				uni.saveImageToPhotosAlbum({
					filePath: filePath, // 这里的 filePath 是拍摄的照片的临时文件路径
					success: () => {
						// 照片已保存到手机相册
						console.log('保存到手机相册成功！！')
					}
				});
			},
			startRecording() {
				uni.startRecord({
					success: (res) => {
						this.isRecording = true;
						this.tempFilePath = res.tempFilePath;
					},
					fail: (err) => {
						console.error('录音失败', err);
					}
				});
			},
			stopRecording() {
				if (this.isRecording) {
					uni.stopRecord();
					this.uploadFile(this.tempFilePath);
					this.isRecording = false;
				}
			},
			startRecord() {
				console.log('开始录音');

				recorderManager.start();
			},
			endRecord() {
				console.log('录音结束');
				recorderManager.stop();
			},
			playVoice() {
				console.log('播放录音');

				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			},
			uploadFile(filePath) {
				uni.uploadFile({
					url: '',
					filePath: filePath,
					name: 'file',
					success: (uploadRes) => {
						console.log('照片上传成功', uploadRes.data);
						// 处理上传成功后的逻辑

					},
					fail: (uploadErr) => {
						console.error('照片上传失败', uploadErr);
					}
				});
			},

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>