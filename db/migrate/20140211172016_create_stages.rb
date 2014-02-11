class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.string :imgurl
      t.string :title
      t.string :description
      t.integer :user_id

      t.timestamps
    end
  end
end
