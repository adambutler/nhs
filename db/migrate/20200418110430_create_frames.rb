class CreateFrames < ActiveRecord::Migration[6.0]
  def change
    create_table :frames, id: :uuid do |t|
      t.text :data
      t.boolean :approved, default: false

      t.timestamps
    end
    add_index :frames, :approved
  end
end
