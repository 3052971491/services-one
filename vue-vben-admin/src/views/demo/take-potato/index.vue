<template>
  <div class="camera camera-wrapper">
    <div class="view-area flex items-center justify-center">
      <video ref="video" :autoplay="true" muted playsinline class="w-full h-full aaa"></video>
    </div>
    <div class="operate-area">
      <div class="preview-image-wrapper">
        <Image
          :width="72"
          :src="imageData"
          fallback="data:image/png;base64,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"
        />
      </div>
      <div class="photo-button" @click="save()">
        <div class="inside-track"></div>
      </div>
      <div class="reverse-lens" @click="handleReverseLensClick">
        <retweet-outlined :style="{ fontSize: '32px' }" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Image, Select } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { RetweetOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    components: { Image, Select, RetweetOutlined },
    data() {
      return {
        takePhotoLoading: false,
        videoStream: null as any,
        devicesOptions: [],
        deviceId: undefined as string | undefined,
        imageData: '' as string | undefined,
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.startCamera();
      });
    },
    computed: {},
    methods: {
      async startCamera() {
        try {
          this.loading = true;
          const videoConstraints: any = {
            video: { facingMode: 'environment' },
            audio: false,
          }; // 默认使用后置摄像头
          if (navigator?.mediaDevices?.enumerateDevices) {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const backCamera = devices.find(
              (device) =>
                device.kind === 'videoinput' && device.label.toLowerCase().includes('back'),
            );
            const frontCamera = devices.find(
              (device) =>
                device.kind === 'videoinput' && device.label.toLowerCase().includes('front'),
            );
            devices.map((device) => {
              if (!this.devicesOptions.find((i) => i.value === device.deviceId)) {
                if (device.kind === 'videoinput') {
                  this.devicesOptions.push({
                    label: device.label.toLowerCase(),
                    value: device.deviceId,
                  });
                }
              }
            });

            if (backCamera) {
              videoConstraints.video.deviceId = { exact: backCamera.deviceId };
              this.deviceId = backCamera.deviceId;
            } else if (frontCamera) {
              videoConstraints.video.deviceId = { exact: frontCamera.deviceId };
              this.deviceId = frontCamera.deviceId;
            } else {
              if (this.devicesOptions.length > 0) {
                this.deviceId = this.devicesOptions[0].value;
              }
            }
          }

          videoConstraints.video.width = { min: 640, ideal: 1280 };
          videoConstraints.video.height = { min: 360, ideal: 720 };
          videoConstraints.video.frameRate = { ideal: 30 };

          this.videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
          const videoElement = this.$refs.video as HTMLVideoElement;
          videoElement.srcObject = this.videoStream;

          await new Promise((resolve) => (videoElement.onloadeddata = resolve));
          this.loading = false;
        } catch (error) {
          this.message.error('无法访问摄像头或拍照失败');
          console.error(error);
        }
      },

      async stopCamera() {
        if (this.videoStream) {
          for (const track of this.videoStream.getTracks()) {
            await track.stop();
          }
        }
        const videoElement = this.$refs.video as HTMLVideoElement;
        if (videoElement && videoElement.srcObject) {
          videoElement.srcObject = null;
          videoElement.pause();
          window.URL.revokeObjectURL(videoElement.src);
          this.videoStream = null;
        }
      },
      /**
       * 保存方法
       */
      async save() {
        const videoElement = this.$refs.video as HTMLVideoElement;
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const photoURL = canvas.toDataURL('image/jpeg', 1);
        this.imageData = photoURL;
      },
      /** 反转镜头 */
      handleReverseLensClick() {
        if (this.devicesOptions.length <= 1) return;
        const idx = this.devicesOptions.findIndex((i) => i.value === this.deviceId);
        if (idx && idx < this.devicesOptions.length - 1) {
          this.deviceId = this.devicesOptions[idx + 1].value;
        }
      },
    },
    beforeUnmount() {
      this.stopCamera();
    },
  });
</script>
<style lang="less" scoped>
  .camera {
    position: relative;
    width: 100%;
    height: 100%;

    &-wrapper {
      display: flex;
      flex-direction: column;
      background-color: #000;
      color: #fff;

      .options-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 12px;
      }

      .view-area {
        position: relative;
        flex: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;

        video {
          object-fit: cover;
        }
      }

      .operate-area {
        display: flex;
        z-index: 2;
        align-items: center;
        justify-content: space-around;
        height: 86px;
        padding: 20px;
        backdrop-filter: blur(10px);

        .photo-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: #fff;
          cursor: pointer;

          .inside-track {
            width: 64px;
            height: 64px;
            border: 3px solid #000;
            border-radius: 50%;
            background-color: #fff;
          }
        }

        .reverse-lens {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }

  .aaa {
    width: 1280px;
    height: 720px;
    transform: scale(0.6);
  }
</style>
