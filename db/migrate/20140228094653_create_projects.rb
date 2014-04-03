class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :user_id
      t.timestamps
    end
    add_column :stages, :project_id, :integer
  end
end
