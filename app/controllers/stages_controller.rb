class StagesController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!
  before_action :set_stage, only: [:show, :edit, :update, :destroy]

  # GET /stages
  # GET /stages.json
  def index
    @stages = current_user.stages
    render json: @stages, root: false
  end

  # GET /stages/1
  # GET /stages/1.json
  def show
    if current_user.stages.include? @stage
      render json: @stage
    else
      render :json => @error_object.to_json, :status => :forbidden
    end
  end

  # GET /stages/new
  def new
    @stage = Stage.new
  end

  # GET /stages/1/edit
  def edit
  end

  # POST /stages
  # POST /stages.json
  def create
    @stage = Stage.new(stage_params)
    @stage.user_id = current_user

    respond_to do |format|
      if @stage.save
        format.html { redirect_to @stage, notice: 'Stage was successfully created.' }
        format.json { render action: 'show', status: :created, location: @stage }
      else
        format.html { render action: 'new' }
        format.json { render json: @stage.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stages/1
  # PATCH/PUT /stages/1.json
  def update
    respond_to do |format|
      if @stage.update(stage_params)
        format.html { redirect_to @stage, notice: 'Stage was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @stage.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stages/1
  # DELETE /stages/1.json
  def destroy
    @stage.destroy
    respond_to do |format|
      format.html { redirect_to stages_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stage
      @stage = Stage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def stage_params
      params.require(:stage).permit(:imgurl, :title, :description, :user_id)
    end
end
