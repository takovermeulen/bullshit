<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 bg-gradient-warning shape-skew">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-12">
                <h1 class="display-3  text-white">
                  Genereer bullshit
                  <span>en maak indruk op je collega's!</span>
                </h1>
                <p class="lead text-white">
                  Een tool waarmee je de meest fantastische adviesteksten kan schrijven. Automatisch. Tijdbesparend!
                </p>

                <div class="btn-wrapper">
                  <base-button
                    class="mb-3"
                    type="white"
                    icon="fa fa-random"
                    @click="randomSequence"
                  >
                    Genereer een zin
                  </base-button>
                  <base-button
                    class="mb-3"
                    type="white"
                    icon="fa fa-random"
                    @click="randomSequences"
                  >
                    Genereer een memo!
                  </base-button>
                  <base-dropdown class="mb-3">
                    <base-button slot="title" type="white" class="dropdown-toggle mb-3">
                      {{ adviceTypeSelected }}
                    </base-button>
                    <a class="dropdown-item" @click="changeAdviceType">{{ adviceTypes.filter(function(value, index, arr){
                      return value != adviceTypeSelected})[0].toUpperCase() }}</a>
                  </base-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="section section-lg pt-lg-0">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div id="advice" class="col-lg-12">
                <card shadow class="shadow-lg--hover mt-5">
                  <div class="d-flex px-3">
                    <div>
                      <icon
                        name="ni ni-satisfied"
                        gradient="success"
                        color="white"
                        shadow
                        rounded
                      />
                    </div>
                    <div class="pl-4">
                      <h5 class="title text-success">
                        {{ title }}
                      </h5>
                      <div>
                        <p v-if="!inEditMode" :key="message" style="white-space: pre-line;">
                          {{ message }}
                        </p>
                      </div>
                      <div v-if="inEditMode">
                        <b-form inline>
                          <b-form-select
                            v-for="(word, index) in matrix[adviceTypeSelected]"
                            :key="index"
                            :value="selectedWord(index)"
                            size="small"
                            class="text-select mb-2 mr-sm-2 mb-sm-0"
                            @change="updateSequence($event)"
                          >
                            {{ word }}
                            <b-form-select-option
                              v-for="(w, i) in matrix[adviceTypeSelected][index]"
                              :key="i"
                              :text="w"
                              :value="[index, i]"
                            >
                              {{ w }}
                            </b-form-select-option>
                          </b-form-select>
                        </b-form>
                      </div>
                      <div class="base-button">
                        <base-button
                          v-if="sentenceSequence.length <= 1 && !inEditMode"
                          class="mb-3"
                          type="white"
                          icon="fa fa-random"
                          @click="randomSequence"
                        >
                          Nieuwe zin
                        </base-button>
                        <a v-if="sentenceSequence.length <= 1" class="" target="_blank" rel="noopener" @click="toggleEditMode">
                          <base-button
                            v-if="!inEditMode"
                            class="mb-3"
                            type="white"
                            icon="fa fa-edit"
                          >
                            Edit
                          </base-button>
                          <base-button
                            v-if="inEditMode"
                            class="mb-3"
                            type="white"
                            icon="fa fa-check"
                          >
                            Done
                          </base-button>
                        </a>
                        <client-only>
                          <a v-if="webShareApiSupported" class="" target="_blank" rel="noopener" @click="shareViaWebShare">
                            <base-button
                              class="mb-3"
                              type="white"
                              icon="fa fa-share-alt"
                            >
                              Deel
                            </base-button></a>
                        </client-only>
                        <a :href="sharingUrl" class="" target="_blank" rel="noopener">
                          <base-button
                            class="mb-3"
                            type="white"
                            icon="fab fa-linkedin"
                          >
                            Deel op LinkedIn
                          </base-button></a>

                      </div>
                    </div>
                  </div>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { BFormSelect, BFormSelectOption, BForm } from 'bootstrap-vue'
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import BullshitGenerator from '@/modules/BullshitGenerator'
import BaseDropdown from '@/components/argon/BaseDropdown'

Vue.use(VueScrollTo)

export default {
  components: {
    BaseDropdown,
    'b-form-select': BFormSelect,
    'b-form-select-option': BFormSelectOption,
    'b-form': BForm
  },
  scrollToTop: false,
  data () {
    return {
      matrix: BullshitGenerator.matrix,
      adviceTypes: ['consultant', 'ambtenaar'],
      adviceTypeSelected: 'consultant',
      sentenceSequence: [],
      inEditMode: false,
      title: 'Jouw advies',
      metaDescription: '',
      sharingUrl: 'https://www.linkedin.com/sharing/share-offsite/?url=' + 'https://bullshit2.takovermeulen.eu/'
    }
  },
  async fetch () {
    const adviceType = this.$route.params.adviceType
    const bullshitId = this.$route.params.bullshitId

    if (adviceType != null && bullshitId != null) {
      // we have data in the url
      const sequencePromise = new Promise(function (resolve, reject) {
        resolve(BullshitGenerator.getSequenceFromBase64(bullshitId))
      })
      this.sentenceSequence = await sequencePromise
      this.adviceTypeSelected = adviceType
    } else {
      // start fresh or refresh
      const sequencePromise = new Promise(function (resolve, reject) {
        resolve(BullshitGenerator.generateSequence(1))
      })
      this.sentenceSequence = await sequencePromise
      this.adviceTypeSelected = 'consultant'
    }
    this.metaDescription = BullshitGenerator.getMessage(this.sentenceSequence, this.adviceTypeSelected)
  },
  head () {
    return {
      meta: [
        { hid: 'description', name: 'description', content: this.metaDescription },
        { hid: 'og:description', name: 'og:description', content: this.metaDescription },
        { hid: 'og:url', name: 'og:url', content: this.sharingUrl }
      ]
    }
  },
  computed: {
    message () {
      return BullshitGenerator.getMessage(this.sentenceSequence, this.adviceTypeSelected)
    },
    webShareApiSupported() {
      if (typeof navigator !== 'undefined') {
        return navigator.share || false
      } else {
        return false
      }
    }
  },
  watch: {
    sentenceSequence () {
      this.updateSharingUrl()
    },
    adviceTypeSelected () {
      this.updateSharingUrl()
    }
  },
  methods: {
    selectedWord (index) {
      return [index, this.sentenceSequence[0][index]]
    },
    randomSequence () {
      this.sentenceSequence = BullshitGenerator.generateSequence()
      this.$scrollTo('#advice')
    },
    randomSequences () {
      this.sentenceSequence = BullshitGenerator.generateSequence(Math.floor(Math.random() * 5) + 5)
      this.$scrollTo('#advice')
    },
    changeAdviceType () {
      this.adviceTypeSelected = this.adviceTypes.filter(function (value) {
        return value !== this.adviceTypeSelected
      }, this)[0]
      this.$scrollTo('#advice')
    },
    toggleEditMode () {
      this.inEditMode = this.inEditMode !== true
    },
    updateSequence (index) {
      this.$set(this.sentenceSequence[0], [index[0]], index[1])
      this.$scrollTo('#advice')
    },
    updateSharingUrl () {
      this.sharingUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' +
        'https://bullshit2.takovermeulen.eu/' +
        this.adviceTypeSelected + '/' +
        BullshitGenerator.getBase64FromSequence(this.sentenceSequence)
    },
    shareViaWebShare () {
      navigator.share({
        title: 'Bullshit Generator',
        text: this.message,
        url: this.sharingUrl
      })
    }
  }
}
</script>
<style>

.text-select {
  display: inline-block;
  width: 100%;
  /*height: 1rem !important;*/
  /*padding: $custom-select-padding-y ($custom-select-padding-x + $custom-select-indicator-padding) $custom-select-padding-y $custom-select-padding-x;*/
  /*line-height: $custom-select-line-height;*/
  color: #000000 !important;
  /*vertical-align: middle;*/
  background-color: transparent !important;
  /*background-size: $custom-select-bg-size;*/
  border: 0pt !important;
  box-shadow: none !important;;
  /*appearance: none;*/
}

</style>
