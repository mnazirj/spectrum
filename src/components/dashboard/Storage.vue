<template>
  {{ newProduct.image }}
  <div>
    <div id="header" class="d-flex justify-content-between flex-wrap m-2 my-3 w-100">
      <div id="search-container" class="d-flex justify-content-end w-75">
        <div class="d-flex justify-content-center w-75">
          <IconField class="w-100">
            <InputIcon class="pi pi-search text-main-color" />
            <InputText v-model="searchValue" :placeholder="$t('dash.search')" class="w-75" />
          </IconField>
        </div>
      </div>
      <div id="btn-create-container" class="d-flex justify-content-end w-25 px-3">
        <Button :label="$t('dash.create')" icon="pi pi-plus" class="custom-button" style="min-width: 6rem" @click="creatDialog = true" />
      </div>
    </div>
    <div id="body" class="d-flex justify-content-center">
      <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" removableSort :class="['custom-datatable text-nowrap', isEng ? 'ltr' : 'rtl']" :style="{ width: '95%' }" :loading="products == null">
        <Column :header="$t('dash.id')">
          <template #body="slotProps">
            <span>#{{ slotProps.data.id }}</span>
          </template>
        </Column>
        <Column :header="$t('dash.name')">
          <template #body="slotProps">
            <span v-if="isEng">{{ slotProps.data.name }}</span>
            <span v-else>{{ slotProps.data.arName }}</span>
          </template>
        </Column>
        <Column :header="$t('dash.category.category')">
          <template #body="slotProps">
            <span v-if="isEng">{{ slotProps.data.category.title }}</span>
            <span v-else>{{ slotProps.data.category.arName }}</span>
          </template>
        </Column>
        <Column :header="$t('dash.brand.brand')">
          <template #body="slotProps">
            <span v-if="isEng">{{ slotProps.data.brand.title }}</span>
            <span v-else>{{ slotProps.data.brand.arName }}</span>
          </template>
        </Column>
        <Column :header="$t('dash.storage.price')">
          <template #body="slotProps">
            <div v-if="slotProps.data.hasProprety">
              <span>{{ slotProps.data.propreties[0]?.price }}$</span>
            </div>
            <div v-else>{{ slotProps.data.price }} $</div>
          </template>
        </Column>
        <Column :header="$t('dash.storage.availability')">
          <template #body="slotProps">
            <i v-if="slotProps.data.availability" class="pi pi-check-circle text-success" />
            <i v-else class="pi pi-ban text-danger" />
          </template>
        </Column>
        <Column field="quantity" :header="$t('dash.storage.quantity')"></Column>
        <Column :header="$t('dash.actions')">
          <template #body="slotProps">
            <div class="d-flex">
              <Button icon="pi pi-eye" variant="text" class="mx-1" @click="router.push(`/shop/product/${slotProps.data.slug}`)"></Button>
              <Button icon="pi pi-pen-to-square" severity="info" variant="text" class="mx-1" @click="openEditDialog(slotProps.data)"></Button>
              <Button icon="pi pi-trash" severity="danger" variant="text" class="mx-1" @click="openDeleteDialog(slotProps.data)"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <!-- Create Dialog -->
  <Dialog v-model:visible="creatDialog" modal :header="$t('dash.storage.create_a_product')" :style="{ width: '60rem' }" :dir="isEng ? 'ltr' : 'rtl'" dismissableMask>
    <Form v-slot="$form" :resolver="createResolver" @submit="onFormSubmitCreate">
      <div class="d-flex justify-content-center align-items-center flex-wrap w-100 p-2 px-4">
        <div class="w-100 d-flex align-items-center my-3">
          <span class="mx-2 fs-5 font-bold">{{ $t("dash.storage.availability") }} </span>
          <ToggleSwitch v-model="newProduct.availability" class="mx-2 d-flex" />
        </div>
        <!-- Product Name -->
        <div id="name-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <InputText id="name-in-english" name="name" v-model="newProduct.name" fluid />
              <label for="name-in-english"
                ><i class="fa-solid fa-heading mx-1" /><span class="mx-1">{{ $t("dash.name_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.name.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <InputText v-model="newProduct.arName" name="arName" id="name-in-arabic" fluid />
              <label for="name-in-arabic"
                ><i class="fa-solid fa-heading mx-1" /><span class="mx-1">{{ $t("dash.name_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arName?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arName.error?.message) }}</Message>
          </div>
        </div>
        <!-- description -->
        <div id="description-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <Textarea id="description-in-english" v-model="newProduct.description" name="description" rows="5" cols="30" style="resize: none" fluid />
              <label for="description-in-english"
                ><i class="pi pi-pencil mx-1" /><span class="mx-1">{{ $t("dash.description_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.description.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea id="description-in-arabic" name="arDescription" v-model="newProduct.arDescription" rows="5" cols="30" style="resize: none" fluid />
              <label for="description-in-arabic"
                ><i class="pi pi-pencil mx-1" /><span class="mx-1">{{ $t("dash.description_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arDescription?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arDescription.error?.message) }}</Message>
          </div>
        </div>
        <!-- Product Ingredients -->
        <div id="ingredients-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <Textarea id="ingredients-in-english" name="ingredients" v-model="newProduct.ingredients" rows="5" cols="30" style="resize: none" fluid />
              <label for="ingredients-in-english"
                ><i class="fa-solid fa-receipt mx-1" /><span class="mx-1">{{ $t("dash.storage.ingredients_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.ingredients?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.ingredients.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea id="ingredients-in-arabic" name="arIngredients" v-model="newProduct.arIngredients" rows="5" cols="30" style="resize: none" fluid />
              <label for="ingredients-in-arabic"
                ><i class="fa-solid fa-receipt mx-1" /><span class="mx-1">{{ $t("dash.storage.ingredients_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arIngredients?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arIngredients.error?.message) }}</Message>
          </div>
        </div>
        <!-- Tips -->
        <div id="tips-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <Textarea id="tip-in-english" name="tips" v-model="newProduct.tips" rows="5" cols="30" style="resize: none" fluid />
              <label for="tip-in-english"
                ><i class="fa-regular fa-thumbs-up mx-1" /><span class="mx-1">{{ $t("dash.storage.tips_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.tips?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.tips.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea id="tip-in-arabic" name="arTips" v-model="newProduct.arTips" rows="5" cols="30" style="resize: none" fluid />
              <label for="tip-in-arabic"
                ><i class="fa-regular fa-thumbs-up mx-1" /><span class="mx-1">{{ $t("dash.storage.tips_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arTips?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arTips.error?.message) }}</Message>
          </div>
        </div>
        <!-- Note -->
        <div id="notes-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <Textarea id="note-in-english" name="notes" v-model="newProduct.notes" rows="5" cols="30" style="resize: none" fluid />
              <label for="note-in-english"
                ><i class="fa-regular fa-clipboard mx-1" /><span class="mx-1">{{ $t("dash.storage.notes_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.notes?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.notes.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea id="note-in-arabic" name="arNotes" v-model="newProduct.arNotes" rows="5" cols="30" style="resize: none" fluid />
              <label for="note-in-arabic"
                ><i class="fa-regular fa-clipboard mx-1" /><span class="mx-1">{{ $t("dash.storage.notes_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arNotes?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arNotes.error?.message) }}</Message>
          </div>
        </div>
        <!-- Category & subCategory & item -->
        <div id="ccq-container" class="section-3 d-flex flex-wrap align-content-center w-100 my-3">
          <div class="mt-3">
            <Select v-model="newProduct.categoryId" optionValue="id" :options="categories" optionLabel="title" name="categories" :placeholder="$t('dash.storage.select_a_category')" class="w-100" @change="filterSubCategory(newProduct.categoryId)" />
            <Message v-if="$form.categories?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.categories.error?.message) }}</Message>
          </div>
          <div class="mt-3">
            <Select v-model="newProduct.subCategoryId" optionValue="id" :options="filteredSubCategories" optionLabel="title" name="sub_categories" :placeholder="$t('dash.storage.select_a_sub-category')" class="w-100" v-if="newProduct.categoryId != null" @change="filterItem(newProduct.subCategoryId)" />
            <Message v-if="$form.sub_categories?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.sub_categories.error?.message) }}</Message>
          </div>
          <div class="mt-3">
            <Select v-model="newProduct.itemsId" optionValue="id" :options="filteredItems" optionLabel="title" name="items" :placeholder="$t('dash.storage.select_a_item')" class="w-100" v-if="newProduct.subCategoryId != null" />
            <Message v-if="$form.items?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.items.error?.message) }}</Message>
          </div>
        </div>
        <!-- brand & quantity -->
        <div id="brnad-container" class="section-3 d-flex flex-wrap align-content-center w-100 my-3">
          <div class="mt-3">
            <Select v-model="newProduct.brandId" optionValue="id" :options="brands" optionLabel="title" name="brands" :placeholder="$t('dash.storage.select_a_brand')" class="w-100" />
            <Message v-if="$form.brands?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.brands.error?.message) }}</Message>
          </div>
          <div class="mt-3">
            <FloatLabel variant="on">
              <InputNumber id="quantity" v-model="newProduct.quantity" fluid />
              <label for="quantity"
                ><i class="pi pi-calculator mx-1" /><span class="mx-1">{{ $t("dash.storage.quantity") }}</span></label
              >
            </FloatLabel>
          </div>
          <div class="mt-3">
            <Select v-model="newProduct.gender" :options="genders" optionValue="value" optionLabel="lable" :placeholder="$t('dash.storage.select_a_gender')" class="w-100" />
          </div>
        </div>
        <!-- has proparety -->
        <div id="hasproparety-container" class="d-flex flex-wrap align-items-center w-100 my-3">
          <span class="mx-2 fs-5 font-bold">{{ $t("dash.storage.propareties") }} </span>
          <ToggleSwitch v-model="newProduct.hasProprety" class="mx-2 d-flex" />
        </div>
        <!-- Proparety -->
        <div id="propareties-container" class="d-flex flex-wrap align-items-center w-100 my-3" v-if="newProduct.hasProprety">
          <div class="w-100">
            <i class="pi pi-plus mx-1 fs-5" />
            <span class="mx-1 fs-5 font-bold">{{ $t("dash.storage.propareties") }} </span>
          </div>
          <DataTable :value="newProduct.propreties" v-if="newProduct.propreties != null && newProduct.propreties.length != 0" class="w-100">
            <Column :header="$t('dash.storage.value')">
              <template #body="slotProps">
                <InputText v-model="slotProps.data.value" fluid />

                <Message v-if="proparetyValidationCreate.value[slotProps.index] != null" severity="error" size="small" variant="simple" class="w-100">{{ $t(proparetyValidationCreate.value[slotProps.index].message) }}</Message>
              </template>
            </Column>
            <Column :header="$t('dash.storage.price')">
              <template #body="slotProps">
                <InputText v-model="slotProps.data.price" fluid />
                <Message v-if="proparetyValidationCreate.price[slotProps.index] != null" severity="error" size="small" variant="simple" class="w-100">{{ $t(proparetyValidationCreate.price[slotProps.index].message) }}</Message>
              </template>
            </Column>
            <Column :header="$t('dash.storage.type')">
              <template #body>
                <SelectButton v-model="proparetyTypeSelected" :options="proparetiesType" />
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <Button icon="pi pi-trash" severity="danger" variant="text" @click="newProduct.propreties.splice(slotProps.index, 1)" />
              </template>
            </Column>
          </DataTable>
          <div class="w-100 d-flex justify-content-center mt-2">
            <Button
              icon="pi pi-plus"
              :label="$t('dash.add')"
              variant="text"
              @click="
                newProduct.propreties.push({
                  id: null,
                  type: proparetyTypeSelected,
                  value: null,
                  price: null,
                })
              "></Button>
          </div>
        </div>
        <!-- Payment -->
        <div id="payment-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div v-if="!newProduct.hasProprety">
            <FloatLabel variant="on">
              <InputNumber id="price" v-model="newProduct.price" fluid mode="currency" currency="LYD" locale="en-US" />
              <label for="price"
                ><i class="pi pi-dollar mx-1" /><span class="mx-1">{{ $t("dash.storage.price") }}</span></label
              >
            </FloatLabel>
          </div>
          <div>
            <FloatLabel variant="on">
              <InputNumber id="discount" v-model="newProduct.discount" fluid :max="100" :min="0" prefix="%" />
              <label for="discount"
                ><i class="pi pi-percentage mx-1" /><span class="mx-1">{{ $t("dash.storage.discount") }}</span></label
              >
            </FloatLabel>
          </div>
        </div>
        <!-- Product Images -->
        <div id="images-container" class="d-flex flex-wrap justify-content-center align-content-center w-100 my-3">
          <div class="w-100">
            <i class="pi pi-images fs-5"></i>
            <span class="fs-5 font-bold mx-2">{{ $t("dash.storage.prodcut_images") }}</span>
          </div>
          <div class="w-100 d-flex justify-content-center flex-wrap">
            <div v-for="(img, i) in newProduct.image" :key="i" class="image-container mx-3 my-2 relative" @mouseenter="isImageHovered = true" @mouseleave="isImageHovered = false">
              <img :src="trasformIntoURL(img)" :alt="'image-' + i" class="product-imgs" />
              <div v-show="isImageHovered" class="overlay-imgs d-flex justify-content-center align-items-center">
                <i class="pi pi-eye mx-1 t fs-3 cursor-pointer" :style="{ color: 'var(--primary-color-500)' }" @click="viewImage(img)"></i>

                <i class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer" @click="newProduct.image.splice(i, 1)"></i>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center w-100 mt-4">
            <input ref="fileInputImage" type="file" accept="image/*" class="d-none" @change="addImageCreate" />
            <Button icon="pi pi-plus" :label="$t('dash.add')" variant="text" @click="fileInputImage.click()"></Button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <Button icon="pi pi-plus" :label="$t('dash.create')" type="submit" :loading="loadingData" />
      </div>
    </Form>
  </Dialog>

  <!-- Edit Dialog -->
  <Dialog
    v-model:visible="editDialog"
    modal
    :header="`
      ${$t('dash.edit')}  ${$t('dash.storage.product')}  '${isEng ? currentData.name : currentData.arName}'`"
    :style="{ width: '60rem' }"
    :dir="isEng ? 'ltr' : 'rtl'"
    dismissableMask>
    <Form v-slot="$form" :resolver="editResolver" @submit="onFormSubmitEdit">
      <div class="d-flex justify-content-center align-items-center flex-wrap w-100 p-2 px-4">
        <div class="w-100 d-flex align-items-center my-3">
          <span class="mx-2 fs-5 font-bold">{{ $t("dash.storage.availability") }} </span>
          <ToggleSwitch v-model="currentData.availability" class="mx-2 d-flex" />
        </div>
        <!-- Product Name -->
        <div id="name-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <InputText v-model="currentData.name" id="name-in-english" name="name" fluid />
              <label for="name-in-english"
                ><i class="fa-solid fa-heading mx-1" /><span class="mx-1">{{ $t("dash.name_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.name.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <InputText v-model="currentData.arName" id="name-in-arabic" name="arName" fluid />
              <label for="name-in-arabic"
                ><i class="fa-solid fa-heading mx-1" /><span class="mx-1">{{ $t("dash.name_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arName?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arName.error?.message) }}</Message>
          </div>
        </div>
        <!-- description -->
        <div id="description-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <Textarea id="description-in-english" name="description" rows="5" cols="30" style="resize: none" v-model="currentData.description" fluid />
              <label for="description-in-english"
                ><i class="pi pi-pencil mx-1" /><span class="mx-1">{{ $t("dash.description_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.description.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea id="description-in-arabic" name="arDescription" rows="5" cols="30" style="resize: none" v-model="currentData.arDescription" fluid />
              <label for="description-in-arabic"
                ><i class="pi pi-pencil mx-1" /><span class="mx-1">{{ $t("dash.description_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arDescription?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arDescription.error?.message) }}</Message>
          </div>
        </div>
        <!-- Product Ingredients -->
        <div id="ingredients-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <Textarea id="ingredients-in-english" name="ingredients" v-model="currentData.ingredients" rows="5" cols="30" style="resize: none" fluid />
              <label for="ingredients-in-english"
                ><i class="fa-solid fa-receipt mx-1" /><span class="mx-1">{{ $t("dash.storage.ingredients_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.ingredients?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.ingredients.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea id="ingredients-in-arabic" name="arIngredients" v-model="currentData.arIngredients" rows="5" cols="30" style="resize: none" fluid />
              <label for="ingredients-in-arabic"
                ><i class="fa-solid fa-receipt mx-1" /><span class="mx-1">{{ $t("dash.storage.ingredients_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arIngredients?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arIngredients.error?.message) }}</Message>
          </div>
        </div>
        <!-- Tips -->
        <div id="tips-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <Textarea id="tip-in-english" name="tips" v-model="currentData.tips" rows="5" cols="30" style="resize: none" fluid />
              <label for="tip-in-english"
                ><i class="fa-regular fa-thumbs-up mx-1" /><span class="mx-1">{{ $t("dash.storage.tips_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.tips?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.tips.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea id="tip-in-arabic" name="arTips" v-model="currentData.arTips" rows="5" cols="30" style="resize: none" fluid />
              <label for="tip-in-arabic"
                ><i class="fa-regular fa-thumbs-up mx-1" /><span class="mx-1">{{ $t("dash.storage.tips_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arTips?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arTips.error?.message) }}</Message>
          </div>
        </div>
        <!-- Note -->
        <div id="notes-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div>
            <FloatLabel variant="on">
              <Textarea id="note-in-english" name="notes" v-model="currentData.notes" rows="5" cols="30" style="resize: none" fluid />
              <label for="note-in-english"
                ><i class="fa-regular fa-thumbs-up mx-1" /><span class="mx-1">{{ $t("dash.storage.notes_in_english") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.notes?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.notes.error?.message) }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea id="note-in-arabic" name="arNotes" v-model="currentData.arNotes" rows="5" cols="30" style="resize: none" fluid />
              <label for="note-in-arabic"
                ><i class="fa-regular fa-thumbs-up mx-1" /><span class="mx-1">{{ $t("dash.storage.notes_in_arabic") }}</span></label
              >
            </FloatLabel>
            <Message v-if="$form.arNotes?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.arNotes.error?.message) }}</Message>
          </div>
        </div>
        <!-- Category & subCategory & item -->
        <div id="ccq-container" class="section-3 d-flex flex-wrap align-content-center w-100 my-3">
          <div class="mt-3">
            <Select v-model="currentData.category.id" :options="categories" optionLabel="title" optionValue="id" name="categories" :placeholder="$t('dash.storage.select_a_category')" class="w-100" @change="filterSubCategory(currentData.category.id)" />
            <Message v-if="$form.categories?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.categories.error?.message) }}</Message>
          </div>
          <div class="mt-3">
            <Select v-model="currentData.subCategory.id" :options="filteredSubCategories" optionLabel="title" optionValue="id" name="sub_categories" :placeholder="$t('dash.storage.select_a_sub-category')" class="w-100" v-if="currentData.category != null" @change="filterItem(currentData.subCategory.id)" />
            <Message v-if="$form.sub_categories?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.sub_categories.error?.message) }}</Message>
          </div>
          <div class="mt-3">
            <Select v-model="currentData.itemsCategory.id" :options="filteredItems" optionLabel="title" optionValue="id" name="items" :placeholder="$t('dash.storage.select_a_item')" class="w-100" v-if="currentData.subCategory != null" />
            <Message v-if="$form.items?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.items.error?.message) }}</Message>
          </div>
        </div>
        <!-- brand & quantity -->
        <div id="brnad-container" class="section-3 d-flex flex-wrap align-content-center w-100 my-3">
          <div class="mt-3">
            <Select v-model="currentData.brand.id" :options="brands" optionLabel="title" optionValue="id" name="brands" :placeholder="$t('dash.storage.select_a_brand')" class="w-100" />
            <Message v-if="$form.brands?.invalid" severity="error" size="small" variant="simple" class="w-100">{{ $t($form.brands.error?.message) }}</Message>
          </div>
          <div class="mt-3">
            <FloatLabel variant="on">
              <InputNumber id="quantity" v-model="currentData.quantity" fluid />
              <label for="quantity"
                ><i class="pi pi-calculator mx-1" /><span class="mx-1">{{ $t("dash.storage.quantity") }}</span></label
              >
            </FloatLabel>
          </div>
          <div class="mt-3">
            <Select v-model="currentData.gender" :options="genders" optionValue="value" optionLabel="lable" :placeholder="$t('dash.storage.select_a_gender')" class="w-100" />
          </div>
        </div>
        <!-- has proparety -->
        <div id="hasproparety-container" class="d-flex flex-wrap align-items-center w-100 my-3">
          <span class="mx-2 fs-5 font-bold">{{ $t("dash.storage.propareties") }} </span>
          <ToggleSwitch v-model="currentData.hasProprety" class="mx-2 d-flex" />
        </div>
        <!-- Proparety -->
        <div id="propareties-container" class="d-flex flex-wrap align-items-center w-100 my-3" v-if="currentData.hasProprety">
          <div class="w-100">
            <i class="pi pi-plus mx-1 fs-5" />
            <span class="mx-1 fs-5 font-bold">{{ $t("dash.storage.propareties") }}</span>
          </div>
          <DataTable :value="currentData.propreties" v-if="currentData.propreties.length > 0" class="w-100">
            <Column :header="$t('dash.storage.value')">
              <template #body="slotProps">
                <InputText v-model="slotProps.data.value" fluid />
                <Message v-if="proparetyValidationEdit.value[slotProps.index] != null" severity="error" size="small" variant="simple" class="w-100">{{ $t(proparetyValidationEdit.value[slotProps.index].message) }}</Message>
              </template>
            </Column>
            <Column :header="$t('dash.storage.price')">
              <template #body="slotProps">
                <InputText v-model="slotProps.data.price" fluid />
                <Message v-if="proparetyValidationEdit.price[slotProps.index] != null" severity="error" size="small" variant="simple" class="w-100">{{ $t(proparetyValidationEdit.price[slotProps.index].message) }}</Message>
              </template>
            </Column>
            <Column :header="$t('dash.storage.type')">
              <template #body>
                <SelectButton v-model="proparetyTypeSelected" :options="proparetiesType" @change="changeProparety(proparetyTypeSelected)" />
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <Button icon="pi pi-trash" severity="danger" variant="text" @click="deleteProparetyEdit(slotProps.index)" />
              </template>
            </Column>
          </DataTable>
          <div class="w-100 d-flex justify-content-center mt-2">
            <Button
              icon="pi pi-plus"
              :label="$t('dash.add')"
              variant="text"
              @click="
                currentData.propreties.push({
                  id: null,
                  type: proparetyTypeSelected,
                  value: null,
                  price: null,
                })
              "></Button>
          </div>
        </div>
        <!-- Payment -->
        <div id="payment-container" class="section d-flex flex-wrap align-content-center w-100 my-3">
          <div v-if="!currentData.hasProprety">
            <FloatLabel variant="on">
              <InputNumber id="price" v-model="currentData.price" fluid mode="currency" currency="LYD" locale="en-US" />
              <label for="price"
                ><i class="pi pi-dollar mx-1" /><span class="mx-1">{{ $t("dash.storage.price") }}</span></label
              >
            </FloatLabel>
          </div>
          <div>
            <FloatLabel variant="on">
              <InputNumber id="discount" v-model="currentData.discount" fluid :max="100" :min="0" prefix="%" />
              <label for="discount"
                ><i class="pi pi-percentage mx-1" /><span class="mx-1">{{ $t("dash.storage.discount") }}</span></label
              >
            </FloatLabel>
          </div>
        </div>
        <!-- Product Images -->
        <div id="images-container" class="d-flex flex-wrap justify-content-center align-content-center w-100 my-3">
          <div class="w-100">
            <i class="pi pi-images fs-5"></i>
            <span class="fs-5 font-bold mx-2">{{ $t("dash.storage.prodcut_images") }}</span>
          </div>
          <div class="w-100 d-flex justify-content-center flex-wrap">
            <div v-for="(img, i) in currentData.images" :key="i" class="image-container mx-3 my-2 relative" @mouseenter="isImageHovered = true" @mouseleave="isImageHovered = false">
              <img :src="'http://publicws.spectrum.e-ibtikar.com/images/' + img.image" :alt="'image-' + i" class="product-imgs" v-if="img.id" />

              <img :src="trasformIntoURL(img)" :alt="'image-' + i" class="product-imgs" v-else />
              <div v-show="isImageHovered" class="overlay-imgs d-flex justify-content-center align-items-center">
                <i class="pi pi-eye mx-1 t fs-3 cursor-pointer" :style="{ color: 'var(--primary-color-500)' }" @click="viewImage(img)"></i>

                <i class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer" @click="deleteImageEdit(i)"></i>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center w-100 mt-4">
            <input ref="fileInputImage" type="file" accept="image/*" class="d-none" @change="addImageEdit" />
            <Button icon="pi pi-plus" :label="$t('dash.add')" variant="text" @click="fileInputImage.click()"></Button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <Button icon="pi pi-file-arrow-up" :label="$t('dash.update')" severity="info" type="submit" :loading="loadingData"></Button>
      </div>
    </Form>
  </Dialog>
  <!-- Delete Dialog -->
  <Dialog v-model:visible="deleteDialog" :modal="true" :closable="true" :header="`${$t('dash.delete')}  ${$t('dash.storage.product')} '${isEng ? currentData.name : currentData.arName}'`" :style="{ width: '35rem' }" :breakpoints="{ '1199px': '85vw', '575px': '95vw' }" :dir="isEng ? 'ltr' : 'rtl'" dismissableMask>
    <span v-if="isEng"> {{ $t("dash.delete_question1") }} {{ $t("dash.storage.product") }} "{{ currentData.title }}" {{ $t("dash.?") }}</span>
    <span v-else> {{ $t("dash.delete_question1") }} {{ $t("dash.storage.product") }} "{{ currentData.arName }}" {{ $t("dash.?") }}</span>
    <template #footer>
      <Button icon="pi pi-trash" :label="$t('dash.delete')" severity="danger" @click="deleteProduct" :loading="loadingData"></Button>
    </template>
  </Dialog>
  <!-- Show Image Dialog -->
  <Dialog v-model:visible="showImageDialog" modal :style="{ width: '70%', height: '80%' }" pt:header="p-0 pb-1 justify-content-end" pt:content="p-0" pt:pcclosebutton:severity="danger" dismissableMask>
    <img
      :src="'http://publicws.spectrum.e-ibtikar.com/images/' + currentImage.image"
      alt="Full Image"
      class="rounded-bottom-3"
      :style="{
        width: '100%',
        height: '100%',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }"
      v-if="currentImage.id" />
    <img
      :src="trasformIntoURL(currentImage)"
      alt="Full Image"
      class="rounded-bottom-3"
      :style="{
        width: '100%',
        height: '100%',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }"
      v-else />
  </Dialog>
</template>

<script setup>
import Dialog from "primevue/dialog";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import SelectButton from "primevue/selectbutton";
import ToggleSwitch from "primevue/toggleswitch";
import { Form } from "@primevue/forms";
import Message from "primevue/message";

import { ref, onBeforeMount, onMounted, computed } from "vue";
import axios from "axios";
import router from "@/router";

// Hooks
onMounted(() => {
  getProducts();
  getCategories();
  getSubCategories();
  getItems();
  getBrands();
});
onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});

// Data
const currentData = ref({
  id: null,
  name: null,
  arName: null,
  description: null,
  arDescription: null,
  ingredients: null,
  arIngredients: null,
  tips: null,
  arTips: null,
  notes: null,
  arNotes: null,
  quantity: 0,
  price: 0,
  discount: 0,
  gender: null,
  createdAt: null,
  updatedAt: null,
  brand: {
    id: null,
    title: null,
    arName: null,
  },
  category: {
    id: null,
    title: null,
    arName: null,
    description: null,
    arDescription: null,
  },
  subCategory: {
    id: null,
    title: null,
    arName: null,
  },
  itemsCategory: {
    id: null,
    title: null,
    arName: null,
  },
  propreties: [
    {
      id: null,
      type: null,
      value: null,
      price: null,
    },
    {
      id: null,
      type: null,
      value: null,
      price: null,
    },
  ],
  image: [
    {
      id: null,
      image: null,
      productId: null,
    },
    {
      id: null,
      image: null,
      productId: null,
    },
  ],
  availability: null,
  hasProprety: null,
  deletedPropeties: [],
});
const currentImage = ref(null);
const isEng = ref(false);
const loadingData = ref(false);
const isImageHovered = ref(false);
const fileInputImage = ref(null);
const creatDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const showImageDialog = ref(false);
const addSizeInput = ref(null);
const products = ref(null);
const newProduct = ref({
  name: null,
  arName: null,
  description: null,
  arDescription: null,
  ingredients: null,
  arIngredients: null,
  tips: null,
  arTips: null,
  notes: null,
  arNotes: null,
  quantity: 0,
  price: 0,
  discount: 0,
  gender: null,
  propreties: [],
  image: [],
  availability: null,
  hasProprety: null,
});
const categories = ref(null);
const subCategories = ref(null);
const items = ref(null);
const brands = ref(null);
const genders = ref([
  { lable: "Male", value: "male" },
  { lable: "Female", value: "female" },
]);
const proparetiesType = ["size", "color"];
const proparetyTypeSelected = ref("size");
const filteredSubCategories = ref(null);
const filteredItems = ref(null);
const newImages = ref([]);
const images = ref(null);
const deletedImages = ref([]);
const deleteProparety = ref([]);
// Computed
const proparetyValidationCreate = computed(() => {
  let counter = 0;
  let proparetiesErrors = { value: [], price: [], isProparetiesValid: true };
  if (newProduct.value.hasProprety) {
    newProduct.value.propreties.forEach((i) => {
      if (!i.value) {
        proparetiesErrors.value.push({
          message: "dash.storage.value_is_required",
        });
        counter++;
      } else {
        proparetiesErrors.value.push(null);
      }
      if (!i.price) {
        proparetiesErrors.price.push({
          message: "dash.storage.price_is_required",
        });
        counter++;
      } else {
        proparetiesErrors.price.push(null);
      }
    });
  }
  if (counter > 0) {
    proparetiesErrors.isProparetiesValid = false;
  }
  return proparetiesErrors;
});
const proparetyValidationEdit = computed(() => {
  let counter = 0;
  let proparetiesErrors = { value: [], price: [], isProparetiesValid: true };
  if (currentData.value.hasProprety) {
    currentData.value.propreties.forEach((i) => {
      if (!i.value) {
        proparetiesErrors.value.push({
          message: "dash.storage.value_is_required",
        });
        counter++;
      } else {
        proparetiesErrors.value.push(null);
      }
      if (!i.price) {
        proparetiesErrors.price.push({
          message: "dash.storage.price_is_required",
        });
        counter++;
      } else {
        proparetiesErrors.price.push(null);
      }
    });
  }
  if (counter > 0) {
    proparetiesErrors.isProparetiesValid = false;
  }
  return proparetiesErrors;
});

const filteredProduct = computed(() => {
  if (!searchValue.value) {
    return products.value;
  }
  return products.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.arName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.arDescription.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.ingredients.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.arIngredients.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.tips.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.arTips.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.arNotes.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.category.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.subCategory.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.subCategory.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.itemsCategory.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.itemsCategory.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.brand.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.brand.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.id.toString().includes(searchValue.value)
  );
});

// Methods
function openEditDialog(data) {
  currentData.value = data;
  filterSubCategory(currentData.value.category.id);
  filterItem(currentData.value.subCategory.id);
  if (currentData.value.propreties.length > 0) {
    proparetyTypeSelected.value = currentData.value.propreties[0].type;
  }
  console.log(proparetyTypeSelected.value);
  console.log(currentData.value);
  editDialog.value = true;
}
function openDeleteDialog(data) {
  currentData.value = data;
  deleteDialog.value = true;
}
function viewImage(data) {
  currentImage.value = data;
  showImageDialog.value = true;
}
function trasformIntoURL(file) {
  return URL.createObjectURL(file);
}
function addImageCreate(event) {
  const file = event.target.files?.[0];
  console.log(file);
  if (!file) {
    console.error("No file selected");
    return;
  }
  // newProduct.value.image.push(file);
  const reader = new FileReader();
  reader.onload = () => {
    newProduct.value.image.push(file);
    console.log(newProduct.value.image);
  };
  reader.readAsDataURL(file);
}
function addImageEdit(event) {
  const file = event.target.files?.[0];
  if (!file) {
    console.error("No file selected");
    return;
  }

  newImages.value.push(file);
  currentData.value.images.push(file);
}

function deleteProparetyEdit(index) {
  deleteProparety.value.push(currentData.value.propreties[index].id);

  currentData.value.propreties.splice(index, 1);
  console.log(deleteProparety.value);
  console.log(currentData.value.propreties);
}
function deleteImageEdit(index) {
  console.log(currentData.value.images[index].id);
  if (currentData.value.images[index].id) {
    deletedImages.value.push(currentData.value.images[index].id);
  }
  currentData.value.images.splice(index, 1);
  console.log(deletedImages.value);
}
function getProducts() {
  axios
    .get("/control/list/product", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        products.value = res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
function filterSubCategory(categoryId) {
  filteredSubCategories.value = subCategories.value.filter((item) => item.category.id == categoryId);
}
function filterItem(subCategoryId) {
  filteredItems.value = items.value.filter((item) => item.sub_categories.id == subCategoryId);
}
function createProduct() {
  loadingData.value = true;
  newProduct.value.propreties.forEach((i) => {
    console.log(i.id);
    i.type = proparetyTypeSelected.value;
  });
  console.log(newProduct.value);
  axios
    .post("/control/new/product", newProduct.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status == 201) {
        loadingData.value = false;
        window.location.reload();
      }
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function updateProduct() {
  loadingData.value = true;
  currentData.value.image = newImages.value;
  currentData.value.deletedImages = deletedImages.value;
  currentData.value.deletedPropreties = deleteProparety.value;

  currentData.value.propreties.forEach((i) => {
    i.type = proparetyTypeSelected.value;
  });
  currentData.value.categoryId = currentData.value.category.id;
  currentData.value.subCategoryId = currentData.value.subCategory.id;
  currentData.value.itemsId = currentData.value.itemsCategory.id;
  currentData.value.brandId = currentData.value.brand.id;

  axios
    .put(`/control/modify/product/${currentData.value.id}`, currentData.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status == 200) {
        loadingData.value = false;
        window.location.reload();
      }
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function deleteProduct() {
  loadingData.value = true;
  axios
    .delete(`/control/delete/product/${currentData.value.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        loadingData.value = false;
        window.location.reload();
      }
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function getCategories() {
  axios
    .get("/control/list/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        categories.value = res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
function getSubCategories() {
  axios
    .get("control/list/subcategory", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        subCategories.value = res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
function getItems() {
  axios
    .get("/control/list/subitems", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        items.value = res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
function getBrands() {
  axios
    .get("/control/list/brand", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        brands.value = res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
const createResolver = ({ values }) => {
  const errors = {};

  if (!values.name) {
    errors.name = [{ message: "dash.name_in_english_is_required" }];
  }
  if (!values.arName) {
    errors.arName = [{ message: "dash.name_in_arabic_is_required" }];
  }

  if (!values.description) {
    errors.description = [{ message: "dash.description_in_english_is_required" }];
  }
  if (!values.arDescription) {
    errors.arDescription = [{ message: "dash.description_in_arabic_is_required" }];
  }

  if (!values.ingredients) {
    errors.ingredients = [{ message: "dash.storage.ingredients_in_english_is_required" }];
  }
  if (!values.arIngredients) {
    errors.arIngredients = [{ message: "dash.storage.ingredients_in_arabic_is_required" }];
  }

  if (!values.tips) {
    errors.tips = [{ message: "dash.storage.tips_in_english_is_required" }];
  }
  if (!values.arTips) {
    errors.arTips = [{ message: "dash.storage.tips_in_arabic_is_required" }];
  }

  if (!values.notes) {
    errors.notes = [{ message: "dash.storage.notes_in_english_is_required" }];
  }
  if (!values.arNotes) {
    errors.arNotes = [{ message: "dash.storage.notes_in_arabic_is_required" }];
  }

  if (!values.categories) {
    errors.categories = [{ message: "dash.storage.you_must_select_one_of_cateogries" }];
  }
  if (!values.sub_categories) {
    errors.sub_categories = [{ message: "dash.storage.you_must_select_one_of_sub-categories" }];
  }
  if (!values.items) {
    errors.items = [{ message: "dash.storage.you_must_select_one_of_items" }];
  }
  if (!values.brands) {
    errors.brands = [{ message: "dash.storage.you_must_select_one_of_brands" }];
  }

  return { errors };
};
const editResolver = () => {
  const errors = {};

  if (!currentData.value.name) {
    errors.name = [{ message: "dash.name_in_english_is_required" }];
  }
  if (!currentData.value.arName) {
    errors.arName = [{ message: "dash.name_in_arabic_is_required" }];
  }

  if (!currentData.value.description) {
    errors.description = [{ message: "dash.description_in_english_is_required" }];
  }
  if (!currentData.value.arDescription) {
    errors.arDescription = [{ message: "dash.description_in_arabic_is_required" }];
  }

  if (!currentData.value.ingredients) {
    errors.ingredients = [{ message: "dash.storage.ingredients_in_english_is_required" }];
  }
  if (!currentData.value.arIngredients) {
    errors.arIngredients = [{ message: "dash.storage.ingredients_in_arabic_is_required" }];
  }

  if (!currentData.value.tips) {
    errors.tips = [{ message: "dash.storage.tips_in_english_is_required" }];
  }
  if (!currentData.value.arTips) {
    errors.arTips = [{ message: "dash.storage.tips_in_arabic_is_required" }];
  }

  if (!currentData.value.notes) {
    errors.notes = [{ message: "dash.storage.notes_in_english_is_required" }];
  }
  if (!currentData.value.arNotes) {
    errors.arNotes = [{ message: "dash.storage.notes_in_arabic_is_required" }];
  }

  if (!currentData.value.category) {
    errors.categories = [{ message: "dash.storage.you_must_select_one_of_cateogries" }];
  }
  if (!currentData.value.subCategory) {
    errors.sub_categories = [{ message: "dash.storage.you_must_select_one_of_sub-categories" }];
  }
  if (!currentData.value.itemsCategory) {
    errors.items = [{ message: "dash.storage.you_must_select_one_of_items" }];
  }
  if (!currentData.value.brand) {
    errors.brands = [{ message: "dash.storage.you_must_select_one_of_brands" }];
  }

  return { errors };
};
const onFormSubmitCreate = ({ valid }) => {
  if (valid && proparetyValidationCreate.value.isProparetiesValid) {
    createProduct();
    console.log("Created!!");
  }
};
const onFormSubmitEdit = ({ valid }) => {
  if (valid && proparetyValidationEdit.value.isProparetiesValid) {
    updateProduct();
    console.log("Updated!!");
  }
};
</script>

<style scoped>
.cover-image {
  width: 70%;
}

.cover-img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 16rem;
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}

.cover-img-overlay div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}

.cover-image:hover img {
  filter: blur(3px);
}

.cover-image:hover .cover-img-overlay {
  opacity: 1;
  pointer-events: auto;
}

::v-deep .p-datatable-sort-icon {
  color: var(--primary-text-color-500) !important;
}
/* Images */
.image-container {
  width: 13%;
  height: 7.5rem;
}
.product-imgs {
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
}

.overlay-imgs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}
.image-container:hover .overlay-imgs {
  opacity: 1;
  pointer-events: auto;
}
.image-container:hover .product-imgs {
  filter: blur(3px);
}
.overlay-imgs div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}
.full-image {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-attachment: fixed;
  background-size: cover;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); */
}

@media (min-width: 768px) {
  .section,
  .section-3 {
    justify-content: space-between;
  }
  .section div {
    width: 40%;
  }
  .section-3 div {
    width: 30%;
  }
  .cover-image {
    height: 16rem;
  }
}

@media (max-width: 768px) {
  .section,
  .section-3 {
    justify-content: center;
  }
  .section div {
    width: 80%;
    margin: 1rem 0;
  }
  .section-3 div {
    width: 60%;
  }
  .cover-image {
    height: 10rem;
  }
}

@media (min-width: 1440px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 50%;
    justify-content: end;
  }
}
@media (max-width: 1440px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 60%;
    justify-content: end;
  }
}
@media (max-width: 1023px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 70%;
    justify-content: end;
  }
}
@media (max-width: 768px) {
  #search-container {
    width: 100%;
  }
  #header #search-container div {
    width: 90%;
    justify-content: center;
  }
  #header {
    flex-wrap: wrap;
  }
  #btn-create-container {
    width: 90%;
    margin-top: 1rem;
    justify-content: center;
  }
}
</style>
