<script setup>
/* eslint-disable */
import { onMounted, ref } from 'vue';


const closeApp = () => {
  window.api.close();
};
const minimizeApp = () => {
  window.api.minimize();
};
const maximizeApp = () => {
  window.api.maximize();
};

const tab = ref(null);

const baseURL = window.location.origin;

const preloadUrl = () =>
  `file://${window.api.getPreloadUrl()}`;



const tabs = ref([]);


const closeTab = (src) => {
  const index = tabs.value.findIndex(item => item.src == src);
  if (index > -1) {

    tabs.value.splice(index, 1);
    if (src == tab.value) {
      if (tabs.value.length > 0) {
        tab.value = tabs.value[0].src;
      } else {
        tab.value = null
      }
    }
  }
}

const addTab = (tabData) => {
  const index = tabs.value.findIndex(item => item.src == tabData.src);
  if (index == -1) {
    tabs.value.push(tabData);
  }
  tab.value = tabData.src;
}

onMounted(() => {
  window.onkeydown = (e) => {
    if (e.ctrlKey && e.keyCode === 68) {
      const index = tabs.value.findIndex(item => item.src == tab.value);
      if (index > -1) {
        const webviews = document.getElementsByTagName('webview');
        if (webviews.length) {
          webviews[index].openDevTools();
        }
      }
    }
  }
})


</script>

<template>
  <q-layout view="lHh lpr lFf" container style="height: 100vh" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-bar class="q-electron-drag" @dblclick="maximizeApp">
        <q-icon name="difference" class="q-electron-drag--exception" />
        <div>FCode Comparator</div>

        <q-space />

        <q-btn dense flat icon="minimize" @click="minimizeApp" />
        <q-btn dense flat icon="crop_square" @click="maximizeApp" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>

      <div class="q-pa-sm q-pl-md row items-center">
        <div class="cursor-pointer non-selectable">
          File
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>New</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Preferences</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-list>
                    <q-item v-for="n in 3" :key="n" dense clickable>
                      <q-item-section>Submenu Label</q-item-section>
                      <q-item-section side>
                        <q-icon name="keyboard_arrow_right" />
                      </q-item-section>
                      <q-menu auto-close anchor="top end" self="top start">
                        <q-list>
                          <q-item v-for="n in 3" :key="n" dense clickable>
                            <q-item-section>3rd level Label</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>

              <q-separator />

              <q-item
                clickable
                v-close-popup
                @click="addTab({ src: '/settings', title: 'Settings' })"
              >
                <q-item-section>Settings</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup>
                <q-item-section>Quit</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>

      <q-tabs
        v-model="tab"
        dense
        align="left"
        class="bg-primary text-white shadow-2"
        :breakpoint="0"
        inline-label
      >
        <q-tab
          :name="tabItem.src"
          :label="tabItem.title"
          :icon="tabItem.icon"
          v-for="tabItem in tabs"
          :key="tabItem.src"
        >
          <q-btn
            icon="close"
            round
            size="xs"
            dense
            @click.stop="closeTab(tabItem.src)"
            outline
            class="q-ml-sm"
          />
        </q-tab>
      </q-tabs>
    </q-header>

    <q-page-container style="background-color:#fff">
      <q-page :class="{ row: tabs.length }" style="width: 100%;">
        <webview
          v-for="tabItem in tabs"
          :key="tabItem.src"
          :src="`${baseURL}/#${tabItem.src}`"
          style="width:100%;border: 0 none;display:flex"
          :preload="preloadUrl()"
          v-show="tabItem.src == tab"
        ></webview>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-blue-6 text-white" style="height:25px" height-hint="25px">
      <q-toolbar inset class="q-gutter-sm" style="min-height:auto !important">
        <q-space />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

