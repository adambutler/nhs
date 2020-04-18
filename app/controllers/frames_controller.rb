class FramesController < ApplicationController
  def index
    @frames = Frame.where(approved: !(params[:review].present?))
  end

  def create
    @frame = Frame.create!({
      data: params[:frame][:data],
      credit: params[:frame][:credit],
    })

    redirect_to(root_path(submitted: true))
  end
end
