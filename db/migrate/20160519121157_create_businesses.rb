class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do | t |
      t.string :name, null: false, index: true
      t.string :location, null: false
      t.timestamps( null: false )
    end
  end
end
