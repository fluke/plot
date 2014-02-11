class CreateHotspots < ActiveRecord::Migration
  def change
    create_table :hotspots do |t|
      t.string :name
      t.integer :tlx
      t.integer :tly
      t.integer :brx
      t.integer :bry
      t.integer :stage_id

      t.timestamps
    end
  end
end
