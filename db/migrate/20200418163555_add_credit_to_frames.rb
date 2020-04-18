class AddCreditToFrames < ActiveRecord::Migration[6.0]
  def change
    add_column :frames, :credit, :string
  end
end
