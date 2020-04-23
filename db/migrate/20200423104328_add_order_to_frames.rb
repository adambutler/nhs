class AddOrderToFrames < ActiveRecord::Migration[6.0]
  def change
    add_column :frames, :order, :integer
    add_index :frames, :order
  end
end
