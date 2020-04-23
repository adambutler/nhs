# frozen_string_literal: true

class Frame < ApplicationRecord
  default_scope { order(order: :asc) }
end
