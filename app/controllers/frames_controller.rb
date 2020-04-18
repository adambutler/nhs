class FramesController < ApplicationController
  def index
    @frames = Frame.all
  end

  def create
    @frame = Frame.create!({
      data: params[:frame][:data]
    })

    redirect_to(root_path(submitted: true))
  end
end
