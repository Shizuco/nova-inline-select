import find from 'lodash/find';

export default {
    data: () => ({
        isInline: false,
        showUpdateButton: false,
        twoStepDisabled: false
    }),

    computed: {
        /**
         * Determine if the field has a value other than null.
         */
        hasValue() {
            return this.field.value !== null
        },

        /**
         * Return the placeholder text for the field.
         */
        placeholder() {
            return this.field.placeholder || this.__('Choose an option')
        }
    },

    methods: {
        /*async submit() {
            let formData = new FormData();

            formData.append(this.field.attribute, this.value);
            formData.append('_method', 'PUT');

            return Nova.request().post(`/nova-api/${this.resourceName}/${this.resourceId}`, formData)
                .then(() => {
                    let label = find(this.field.options, option => option.value === this.value).label;

                    Nova.success(`${this.field.name} updated to "${label}"`);
                }, (response) => {
                    Nova.error(response);
                })
                .finally(() => {
                    this.showUpdateButton = false;
                });
        },*/

        async submit() {
      this.loading = true;
      try {
        await Nova.request().post(`/nova-vendor/nova-inline-select-field/update/${this.resourceName}`, {
          _inlineResourceId: this.field.resourceId,
          _inlineAttribute: this.field.attribute,
          [this.field.attribute]: this.fieldValue,
        });
        this.editing = false;
        this.field.value = this.fieldValue;

        Nova.success(
          this.__('The :resource was updated!', {
            resource: this.resourceInformation.singularLabel.toLowerCase(),
          })
        );
      } catch (e) {
        console.error(e);
        Nova.error(this.__('There was a problem submitting the form.'));
      }
      this.loading = false;
    },

        attemptUpdate(value) {
            this.value = value;

            if (this.field.indexTwoStepDisabled ?? false) {
                return this.submit();
            }

            this.showUpdateButton = true;
        }
    }
}
