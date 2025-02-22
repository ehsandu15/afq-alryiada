<template>
  <section
    class="app-container container flex min-h-screen flex-col items-center justify-start"
  >
    <div class="contact-us-wrapper">
      <figure
        class="contacts-wrapper"
        :style="{
          backgroundImage: `url(${content?.data.contactBoxImage.url})`,
        }"
      >
        <h4 class="heading">{{ content?.data.contactBoxHeading }}</h4>
        <ul class="contact-info-list">
          <li
            v-for="(info, index) in content?.data.contacts_infos"
            :key="info.id"
          >
            <img
              :src="info.icon.url"
              :alt="info.icon.alternativeText"
              width="32"
              height="32"
            />
            <p v-if="info.type === 'TEXT'">{{ info.value }}</p>
            <a
              class="text-white"
              target="_blank"
              referrerpolicy="no-referrer"
              v-if="info.type === 'LINK'"
              :href="info.value"
              >{{ info.name }}</a
            >
          </li>
        </ul>
      </figure>
      <form
        @submit.prevent="handleSubmit"
        class="grid w-full grid-cols-1 gap-[50px] px-3 py-[65px] pe-0 md:grid-cols-2 md:px-[50px]"
      >
        <span
          class="flex flex-col gap-1.5"
          v-for="elem of content?.data.contactForm.filter(
            (item) =>
              item.__component === 'shared.form-field' &&
              item.type !== 'textarea',
          )"
        >
          <label :for="elem.elemId">{{ elem.title }}</label>
          <input
            v-if="
              elem.type !== 'textarea' &&
              elem.__component === 'shared.form-field'
            "
            :type="elem.type"
            :name="elem.name"
            :id="elem.elemId"
            :placeholder="elem.placeholder"
            required
            class="w-full border-b-[1px] border-[#a5a5a5] px-[10px] py-[5px] text-sm font-medium leading-5 text-[#1f1f1f] outline-none focus:border-[#1f1f1f]"
          />
        </span>
        <span
          class="col-span-2 flex flex-col gap-1.5"
          v-for="elem of content?.data.contactForm.filter(
            (item) =>
              item.type === 'textarea' &&
              item.__component === 'shared.form-field',
          )"
        >
          <label :for="elem.elemId">{{ elem.title }}</label>
          <textarea
            :name="elem.name"
            :id="elem.elemId"
            rows="5"
            :placeholder="elem.placeholder"
            class="w-full border-b-[1px] border-[#a5a5a5] px-[10px] py-[5px] text-sm font-medium leading-5 text-[#1f1f1f] outline-none focus:border-[#1f1f1f]"
          />
        </span>
        <div class="flex items-center justify-start gap-5">
          <button
            v-for="action of content?.data.formActions"
            type="submit"
            class="btn btn-primary max-md:!px-8"
          >
            <template v-if="!isSending">
              <p>{{ action.title }}</p>
              <img
                width="24"
                height="24"
                :src="action.icon.url"
                :alt="action.icon.alternativeText"
              />
            </template>
            <template v-if="isSending">
              <span
                class="size-4 animate-spin rounded-full border-4 border-white border-l-secondary"
              ></span>
            </template>
          </button>
          <span
            class="w-full font-medium capitalize"
            v-if="isError || isSentMessage"
          >
            <small class="text-red-600" v-if="isError">{{
              content?.data.formSendErrorMessage
            }}</small>
            <small v-if="isSentMessage" class="text-emerald-700">{{
              content?.data.formSendSuccessMessage
            }}</small>
          </span>
        </div>
      </form>
    </div>
  </section>
  <FlutingWhatsappButton
    v-if="content?.data"
    :phone-number="content.data.whatsapp.href"
    :icon-url="content.data.whatsapp.icon.url"
  />
</template>
<script setup lang="ts">
import type { ContactData } from "~/types/contact-us";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
const { findOne } = useStrapi<ContactData>();
const nuxtApp = useNuxtApp();
const isSentMessage = ref(false);
const isSending = ref(false);
const isError = ref(false);

const handleSubmit = async (ev: Event) => {
  const target = ev.target as HTMLFormElement;
  const fd = new FormData(ev.currentTarget as any);

  const data = {
    firstName: fd.get("firstName"),
    lastName: fd.get("lastName"),
    phoneNumber: fd.get("phoneNumber"),
    email: fd.get("email"),
    message: fd.get("message"),
  };
  isSending.value = true;

  try {
    const res = await $fetch(`/api/contact-us/send-message`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.success) {
      isSentMessage.value = true;
      target?.reset();
    } else {
      throw new Error(res.message || res.details);
    }
    isError.value = false;
  } catch (err) {
    isError.value = true;
    isSentMessage.value = false;
    console.error("ERROR !! ", err);
  } finally {
    isSending.value = false;
  }
};
const { data: content } = useAsyncData(
  STRAPI_ENDPOINT.CONTACT_US,
  () =>
    findOne(STRAPI_ENDPOINT.CONTACT_US, {
      locale: "ar-SA",
      populate: {
        contactForm: true,
        formActions: {
          populate: { icon: true },
        },
        contacts_infos: {
          populate: { icon: true },
        },
        whatsapp: {
          populate: {
            icon: true,
          },
        },
        contactBoxImage: true,
      },
    }),
  {
    transform: (res) =>
      nuxtApp.runWithContext(() => ({
        ...res,
        data: {
          ...res.data,
          contactBoxImage: {
            ...res.data.contactBoxImage,
            url: imagePathPrefix(res.data.contactBoxImage.url),
          },
          contacts_infos: res.data.contacts_infos.map((item) => ({
            ...item,
            icon: { ...item.icon, url: imagePathPrefix(item.icon.url) },
          })),
          whatsapp: {
            ...res.data.whatsapp,
            icon: {
              ...res.data.whatsapp.icon,
              url: imagePathPrefix(res.data.whatsapp.icon.url),
            },
          },
          formActions: {
            ...res.data.formActions.map((item) => ({
              ...item,
              icon: {
                ...item.icon,
                url: imagePathPrefix(item.icon.url),
              },
            })),
          },
        },
      })),
  },
);

useSeoMeta({
  title: content.value?.data.seoTitle,
  description: content.value?.data.seoDescription,
});
</script>
<style>
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
  display: grid;
  gap: 50px;
  padding-inline: 50px;
  padding-inline-end: 0%;
  padding-block: 65px;
  flex: 1 0 max-content;
  grid-template-columns: 2 fr;
}

@media (max-width: 876px) {
  .form-wrapper {
    padding-inline: 1rem;
    width: 100%;
    grid-template-columns: 1 fr;
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
