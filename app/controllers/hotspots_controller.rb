class HotspotsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!
  before_action :set_hotspot, only: [:show, :edit, :update, :destroy]

  # GET /hotspots
  # GET /hotspots.json
  def index
    @hotspots = Hotspot.all
    render json: @hotspots, root: false
  end

  # GET /hotspots/1
  # GET /hotspots/1.json
  def show
    render json: @hotspot
  end

  # GET /hotspots/new
  def new
    @hotspot = Hotspot.new
  end

  # GET /hotspots/1/edit
  def edit
  end

  # POST /hotspots
  # POST /hotspots.json
  def create
    @hotspot = Hotspot.new(hotspot_params)

    respond_to do |format|
      if @hotspot.save
        format.json { head :no_content }
      else
        format.json { render json: @hotspot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /hotspots/1
  # PATCH/PUT /hotspots/1.json
  def update
    respond_to do |format|
      if @hotspot.update(hotspot_params)
        format.json { head :no_content }
      else
        format.json { render json: @hotspot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hotspots/1
  # DELETE /hotspots/1.json
  def destroy
    @hotspot.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hotspot
      @hotspot = Hotspot.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hotspot_params
      params.require(:hotspot).permit(:name, :tlx, :tly, :brx, :bry, :stage_id)
    end
end
