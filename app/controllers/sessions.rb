get '/login' do
  if logged_in?
    redirect '/'
  else
    if request.xhr?
      erb :'/user_auth/login', layout: false
    end
  end
end

post '/login' do
  @user = User.find_by(username: params[:user][:username])
  if @user && @user.authenticate(params[:user][:password])
    session[:user_id] = @user.id
    if request.xhr?
      erb :'/users/_logged_in_corner', layout: false, locals: { user: @user }
    else
      redirect '/'
    end
  else
    @error = "Email or password was incorrect. Please try again!"
    erb :'/user_auth/login'
  end
end

get '/logout' do
  session.clear
  redirect '/'
end
