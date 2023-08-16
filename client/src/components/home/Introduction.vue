<template>
    <div class="introduction">
        <img data-aos="zoom-in" data-aos-duration="1500" class="cloud1" src="../../../public/img/cover/sakura.png" alt="">
        <img data-aos="zoom-in" data-aos-duration="1500" class="cloud2" src="../../../public/img/cover/sakura.png" alt="">
        <img data-aos="zoom-in" data-aos-duration="1500" class="cloud3" src="../../../public/img/cover/sakura.png" alt="">
        <div class="row">
            <h1 class="text-center mt-5 mt-lg-0" data-aos="zoom-in-down">Who we are ?</h1>
            <p class="col mx-lg-5 mx-2 mt-5">
                Chào mừng bạn đến với Wazen - nơi mang đến sự kết hợp hấp dẫn giữa ngôn ngữ và văn hóa Nhật Bản! Chúng tôi là một nền 
                tảng độc đáo dành cho những tâm hồn yêu thích tiếng Nhật và muốn khám phá sâu hơn về văn hóa đặc trưng của đất nước mặt 
                trời mọc. Tại Wazen, chúng tôi tin rằng việc tìm hiểu về một ngôn ngữ mới không chỉ là việc học từ vựng và ngữ pháp, mà 
                còn là việc thấu hiểu sâu hơn về tư duy và cách sống của người dân sử dụng ngôn ngữ đó. Đó là lý do tại sao chúng tôi 
                tập trung vào việc tạo ra một môi trường học tập đa chiều, giúp bạn hiểu rõ cả về tiếng Nhật và văn hóa Nhật Bản. Bạn 
                sẽ khám phá các flashcard độc đáo tại Wazen, được tạo ra và chia sẻ bởi cộng đồng người học. Những flashcard này được 
                thiết kế khoa học và thú vị, giúp việc học từ vựng và kanji trở nên dễ dàng và gây thú vị hơn bao giờ hết. Chúng giúp 
                bạn ghi nhớ từ mới một cách hiệu quả và lâu dài. Nhưng Wazen không chỉ dừng lại ở việc học ngôn ngữ. Chúng tôi còn là 
                nơi chia sẻ những bài viết sâu sắc về văn hóa Nhật Bản - từ lịch sử và phong tục đến các truyền thống độc đáo. Việc 
                hiểu rõ văn hóa sẽ giúp bạn tiếp cận tiếng Nhật một cách tự nhiên hơn, vì bạn sẽ thấu hiểu ngữ cảnh và nguồn gốc của 
                các cụm từ và ngôn ngữ. Hãy cùng chúng tôi bước vào cuộc hành trình tuyệt vời này tại Wazen, nơi mà học ngôn ngữ và 
                hiểu về văn hóa không chỉ là nhiệm vụ học tập, mà còn là một trải nghiệm thú vị và sâu sắc.
            </p>
        </div>
        <img data-aos="zoom-in" data-aos-duration="1500" class="cloud4" src="../../../public/img/cover/sakura.png" alt="">
        <img data-aos="zoom-in" data-aos-duration="1500" class="cloud5" src="../../../public/img/cover/sakura.png" alt="">
        <img data-aos="zoom-in" data-aos-duration="1500" class="cloud6" src="../../../public/img/cover/sakura.png" alt="">
        <img data-aos="zoom-in" data-aos-duration="1500" class="cloud7" src="../../../public/img/cover/sakura.png" alt="">

  </div>
</template>

<script>
import AOS from 'aos'
import { ref, onMounted } from 'vue'


export default {
    setup() {
        onMounted(() => {
            AOS.init()
        })
    }
}
</script>

<style scoped>

.introduction {
    position: relative;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cloud1 {
    width: 4rem;
    position: absolute;
    top: 2rem;
    left: 5rem;
}

.cloud2 {
    width: 2rem;
    position: absolute;
    top: 3rem;
    left: 2rem;
}

.cloud3 {
    width: 3rem;
    position: absolute;
    top: 7rem;
    left: 1rem;
}

.cloud4 {
    width: 2.6rem;
    position: absolute;
    right: 10rem;
    bottom: 1rem;
}

.cloud5 {
    width: 5rem;
    position: absolute;
    right: 3rem;
    bottom: 2rem;
}

.cloud6 {
    width: 2rem;
    position: absolute;
    right: 12rem;
    bottom: 4rem;
}

.cloud7 {
    width: 1.3rem;
    position: absolute;
    right: 8rem;
    bottom: 3rem;
}

/* .cloud2 {
    width: 26rem;
    position: absolute;
    right: -9rem;
    bottom: -3rem;
} */

p {
    text-align: justify;
    z-index: 2;
}

h1 {
    text-transform: uppercase;
    font-weight: 800;
}



</style>