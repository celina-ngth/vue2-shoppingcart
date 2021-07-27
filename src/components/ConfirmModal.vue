
<template>
  <div class="modal">
    <div class="modal-window">
      <h3>Souhaitez-vous retirer ce produit du panier ?</h3>
      <div class="actions">
        <button class="confirm" @click="onConfirm">Confirmer</button>
        <button class="cancel" @click="onCancel">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-window {
  position: absolute;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  width: 100%;
  min-width: 400px;
  max-width: 600px;
  background: white;
  transform: translate(-50%, -50%);
  padding: 1em;
  text-align: center;
}

.modal-window .actions {
  display: flex;
  justify-content: center;
}

button {
  font-size: inherit;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
</style>
