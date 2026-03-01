class RemoveSlugFromItems < ActiveRecord::Migration[8.1]
  def change
    remove_column :items, :slug, :string
  end
end
