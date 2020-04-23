# frozen_string_literal: true

class FramesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @frames = Frame.where(approved: !params[:review].present?)
  end

  def create
    @frame = Frame.create!({
                             data: params[:frame][:data],
                             credit: params[:frame][:credit]
                           })

    redirect_to(root_path(submitted: true))
  end

  def data
    @frames = Frame.where(approved: true)

    data = @frames.map do |frame|
      parsed_data = JSON.parse(frame.data)
      parsed_data.delete_at(240)
      parsed_data.map { |hex| hex_to_ascii(hex) }.each_slice(48).map(&:join)
    end

    render json: data
  end

  private

  def hex_to_ascii(hex)
    case hex.downcase
    when '#008eff' then '.'
    when '#ffffff' then 'W'
    when '#ff4336' then 'R'
    when '#ff9800' then 'O'
    when '#4cf137' then 'G'
    when '#ffeb3b' then 'Y'
    when '#000000' then ' '
    when '#a55eea' then 'P'
    else hex
    end
  end
end
