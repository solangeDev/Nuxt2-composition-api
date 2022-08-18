<template>
  <div>
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col col lg="6">
          <Post
            :id="currentData.id"
            :title="currentData.title"
            :description="currentData.description"
            @clear-form="clearForm"
          />
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="p-5">
      <b-row class=" mt-5">
        <b-col col lg="12">
          <b-table small :fields="fields" :items="items" responsive="sm">
            <template #cell(actions)="data">
              <div>
                <b-button
                  type="button"
                  variant="danger"
                  @click="onRemove(data)"
                >
                  Borrar
                </b-button>
                <b-button
                  type="button"
                  variant="success"
                  @click="onUpdate(data)"
                >
                  Editar
                </b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Post } from '@/store/models'

@Component({
  components: {},
  layout: 'main'
})
export default class IndexPage extends Vue {
  currentData: Post = {
    id: '',
    title: '',
    description: ''
  }

  fields = [
    { key: 'id', label: '#' },
    { key: 'title', label: 'Titulo' },
    { key: 'description', label: 'Descripcion' },
    { key: 'actions', label: 'Acciones' }
  ]

  get items () {
    return this.$accessor.posts
  }

  clearForm () {
    this.currentData = {
      id: '',
      title: '',
      description: ''
    }
  }

  mounted () {
    this.$accessor.LOAD_POST()
  }

  onRemove (data: { item: Post }) {
    this.$accessor.DELETE_POST(data.item)
  }

  onUpdate (data: { item: Post }) {
    this.currentData = data.item
  }
}
</script>
