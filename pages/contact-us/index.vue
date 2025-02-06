<template>
  <section
    class="app-container container flex min-h-screen flex-col items-center justify-start"
  >
    <div class="contact-us-wrapper">
      <figure
        class="contacts-wrapper"
        :style="{ backgroundImage: `url(${contactUsBoxBackground})` }"
      >
        <h4 class="heading">معلومات التواصل</h4>
        <ul class="contact-info-list">
          <li v-for="(info, index) in CONTACT_INFO" :key="info.id">
            <img :src="info.icon" alt="contact-icon" />
            <p>{{ info.data }}</p>
          </li>
        </ul>
      </figure>
      <form class="form-wrapper">
        <div class="form-group">
          <span class="group-wrapper">
            <label for="first-name">الاسم الاول</label>
            <input
              v-model="formData.firstName"
              type="text"
              name="firstName"
              id="first-name"
              placeholder="...الاسم الاول"
              class="input"
            />
          </span>
          <span class="group-wrapper">
            <label for="last-name">الاسم الاخير</label>
            <input
              v-model="formData.lastName"
              type="text"
              name="lastName"
              id="last-name"
              placeholder="...الاسم الاخير"
              class="input"
            />
          </span>
        </div>
        <div class="form-group">
          <span class="group-wrapper">
            <label for="phone-number">رقم الجوال</label>
            <input
              type="tel"
              name="phoneNumber"
              dir="ltr"
              v-model="formData.phoneNumber"
              id="phone-number"
              placeholder="...رقم الجوال"
              class="input"
            />
          </span>
          <span class="group-wrapper">
            <label for="email">البريد الالكتروني</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="formData.email"
              placeholder="...البريد الالكتروني"
              class="input"
            />
          </span>
        </div>
        <div class="form-group full-width">
          <span class="group-wrapper">
            <label for="message">الرسالة</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              v-model="formData.message"
              placeholder="...اكتب ما تريد"
              class="input"
            />
          </span>
        </div>
        <button type="button" class="btn btn-primary">
          <p>ارسال</p>
          <img :src="sendIcon" alt="send-icon" />
        </button>
      </form>
    </div>
  </section>
  <a
    :href="`https://wa.me/${+9661233333333}`"
    class="fixed bottom-10 left-6 isolate z-30 flex size-[54px] items-center justify-center rounded-full shadow-2xl md:bottom-14 md:left-12 md:size-[64px]"
  >
    <img src="~/assets/images/shared/whatsapp.svg" alt="whatsapp.svg" />
  </a>
</template>
<script setup lang="ts">
import contactUsBoxBackground from "~/assets/images/contact-us/contact-box-bg.png";
import locationPin from "~/assets/images/contact-us/location-pin.svg";
import phoneIcon from "~/assets/images/contact-us/telephone.svg";
import emailIcon from "~/assets/images/contact-us/email.svg";
import sendIcon from "~/assets/images/contact-us/contact-us-icon.svg";

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
});

const CONTACT_INFO = [
  {
    id: 0,
    icon: locationPin,
    data: "المملكة العربية السعودية - المدينة المنورة",
  },
  {
    id: 1,
    icon: phoneIcon,
    data: "966 55 555 5555".split(" ").reverse().join(" ") + "+",
  },
  {
    id: 2,
    icon: emailIcon,
    data: "afq-alriyada@mail.com",
  },
];
</script>
<style scoped>
.contact-us-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: center;
  padding: 50px;
  overflow: hidden;
}

@media (max-width: 992px) {
  .contact-us-wrapper {
    flex-direction: column;
    padding-inline: 0px;
  }
}
.contacts-wrapper {
  background-size: cover;
  background-repeat: no-repeat;
  width: 491px;
  min-width: 491px;
  height: 489px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  justify-content: flex-start;
}
@media (max-width: 876px) {
  .contacts-wrapper {
    width: calc(100% - 0.5rem);
    min-width: calc(100% - 0.5rem);
    background-position: bottom;
  }
}
.contacts-wrapper .heading {
  margin-block: 40px;
  font-size: 28px;
  font-weight: 600;
  line-height: 52px;
  color: #ffffff;
  text-align: center;
}
.contacts-wrapper .contact-info-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  padding-inline: 14px;
}
.contacts-wrapper .contact-info-list > li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.contacts-wrapper .contact-info-list > li p {
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: #ffffff;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-inline: 50px;
  padding-inline-end: 0%;
  padding-block: 65px;
  flex: 1 0 max-content;
}

@media (max-width: 876px) {
  .form-wrapper {
    padding-inline: 1rem;
    width: 100%;
  }
}
.form-wrapper .form-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 54px;
}
@media (max-width: 876px) {
  .form-wrapper .form-group {
    grid-template-columns: repeat(1, 1fr);
  }
}
.form-wrapper .form-group.full-width {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
.form-wrapper .form-group .group-wrapper {
  display: flex;
  flex-direction: column;
}
.form-wrapper .form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #a5a5a5;
  margin-bottom: 3.5px;
}
.form-wrapper .form-group .input {
  width: 100%;
  padding-block: 7px;
  padding-inline: 10px;
  border-bottom: 1px solid #a5a5a5;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #1f1f1f;
}
.form-wrapper .form-group .input:focus {
  border-color: #1f1f1f;
  outline: none;
}
</style>
