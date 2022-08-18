<template>
  <div>
    <h1>{{ titleForm }}</h1>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-title"
        label="Titulo"
        label-for="title"
        description=""
      >
        <b-form-input
          id="title"
          v-model="form.title"
          type="text"
          placeholder=""
          required
        />
      </b-form-group>
      <b-form-group
        id="input-group-description"
        label="Descripcion"
        label-for="description"
        description=""
      >
        <b-form-input
          id="description"
          v-model="form.description"
          type="text"
          placeholder=""
          required
        />
      </b-form-group>
      <b-button type="button" variant="danger" @click="clear()">
        Cancelar
      </b-button>
      <b-button type="submit" variant="primary">
        Enviar
      </b-button>
    </b-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { reactive } from 'vue'
import { uuid } from 'vue-uuid'

const GreetingProps = Vue.extend({
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
})

@Component({
  components: {}
})
export default class PostComponent extends mixins(GreetingProps, Vue) {
  @Watch('id')
  public watchId (newValue: string) {
    this.form.id = newValue
  }

  @Watch('title')
  public watchTitle (newValue: string) {
    this.form.title = newValue
  }

  @Watch('description')
  public watchDescription (newValue: string) {
    this.form.description = newValue
  }

  get titleForm () {
    return this.form.id === '' ? 'Crear Post' : 'Editar Post'
  }

  form = reactive({
    id: '',
    title: '',
    description: ''
  })

  clear () {
    this.$emit('clear-form')
    this.form = {
      id: '',
      title: '',
      description: ''
    }
  }

  onSubmit (e: Event) {
    e.preventDefault()
    if (this.id.length > 0) {
      this.$accessor.UPDATE_POST({
        id: this.id,
        title: this.form.title,
        description: this.form.description
      })
    } else {
      this.$accessor.ADD_POST({
        id: uuid.v1(),
        title: this.form.title,
        description: this.form.description
      })
    }
    this.clear()
  }
}
</script>
