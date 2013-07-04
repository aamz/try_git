use Mojolicious::Lite;

use lib 'lib';
use MyUsers;
use Mojo::IOLoop;

app->secret('Mojolicious rocks and Alex rocks');

helper users => sub { state $users = MyUsers->new };

# Main login action
any '/' => sub {
  my $self = shift;

  # Query or POST parameters
  my $user = $self->param('user') || '';
  my $pass = $self->param('pass') || '';

  # Check password and render "index.html.ep" if necessary
  return $self->render unless $self->users->check($user, $pass);

  # Store username in session
  $self->session(user => $user);

  # Redirect to desktop page with a 302 response
  $self->redirect_to('desktop');
} => 'index';

# Make sure user is logged in for actions in this group
group {
  under sub {
    my $self = shift;

    # Redirect to main page with a 302 response if user is not logged in
    return $self->session('user') || !$self->redirect_to('index');
  };

  # A desktop page auto rendering "desktop.html.ep"
  get '/desktop' => sub {
    my $self = shift;
	$self->render('desktop');
  };
};

# Logout action
get '/logout' => sub {
  my $self = shift;

  # $dbh->disconnect or warn "Disconnection failed: $DBI::errstr\n";
  # exit;
  # Expire and in turn clear session automatically
  $self->session(expires => 1);
  # delete $self->session->{'user'};

  # Redirect to main page with a 302 response
  $self->redirect_to('index');
};

app->start;
__DATA__

@@ index.html.ep
% layout 'default', title => 'Entrar';
% if (param 'user') {
  <div class="alert alert-error">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Acceso denegado.</strong> Por favor, compruebe el nombre de usuario y la contraseña.
  </div>
% }


<!-- start section content-->
<section class="section-content">
 <!-- start content -->
 <div class="content full-page">
     <!-- start section -->
     <section>
         <!-- content header -->
         <header class="content-header">
             <!-- content title-->
             <div class="page-header"></div>
         </header> <!--/ content header -->
         
         <!-- content page -->
         <article class="content-page clearfix">
             <!-- main page, you're application here -->
             <div class="main-page">
                 <div class="content-inner">
                     <div class="row-fluid">
                         <div class="span4 offset4">
                             <!-- widget login -->
                             <div class="widget bg-none">
                                 <!-- widget content -->
                                 <div class="widget-content">
                                     <div class="text-center">
                                         <h1>
					    <!-- Alex quita -->										
                                             <!-- <a href="" class="help-block color-silver" title="your logo"><i class="icomo-stack text-4x"></i></a> -->
                                             ISSA S.A.
                                         </h1>
                                     </div>
                                     <form class="form-vertical" action="/" method="post">
                                         <div class="control-group">
                                             <div class="controls">
                                                 <input class="input-block-level" name="user" placeholder="Username" type="text">
                                             </div>
                                         </div>
                                         <div class="control-group">
                                             <div class="controls">
                                                 <input class="input-block-level" name="pass" placeholder="Password" type="password">
                                             </div>
                                         </div>
                                         <div class="control-group">
                                             <div class="controls">
                                                 <button class="btn btn-large btn-block bg-cyan" type="submit">Iniciar sesión</button>
                                             </div>
                                         </div>
                                     </form>
                                 </div><!-- /widget content -->
                             </div> <!-- /widget login -->
                         </div>
                     </div>
                 </div>
             </div>
             <div class="clearfix"></div>
         </article> <!-- /content page -->
         
         
     </section><!--/ end section -->
 </div><!--/ end content -->
    
</section>
<!-- /end section content-->

@@ desktop.html.ep
% layout 'default', title => 'Tablero';

Bienvenido <%= session 'user' %>.<br>
  
<!-- Alex start Chart -->

<!-- row #1 -->
<div class="shortcut row-fluid">
    <!-- tile -->
    <div tabindex="0" data-looper="go" data-interval="3000" class="span3 tile bg-magenta looper slide up">
        <!-- tile-content -->
        <div class="tile-content">
            <!-- block looper -->
            <div class="looper-inner">
                <div aria-hidden="true" class="item">
                    <a href="#message"><i class="icon-mail"></i></a>
                </div><!-- /item -->
                <div class="item active">
                    <a href="#message1">
                        <div class="text-based" id="mensajeid1">
                            <h4>Re: Mensaje1</h4>
                            <p>Buenos días: Esto es una muestra...</p>
                        </div>
                    </a>
                </div><!-- /item -->
                <div aria-hidden="true" class="item">
                    <a href="#message2">
                        <div class="text-based">
                            <h4>Re: Mensaje2</h4>
                            <p>Esto es otra prueba...</p>
                        </div>
                    </a>
                </div><!-- /item -->
            </div><!-- /block looper -->
        </div><!-- /tile-content -->
        
        <div class="tile-peek">
            <span class="brand">Cantidad de Mensajes</span>
            <span class="badge">2</span>
        </div><!-- /tile-peek -->
    </div><!-- /tile -->
    
    
</div> <!-- /row #1 -->

<!-- Alex end Chart -->
%= link_to Logout => 'logout'

@@ layouts/default.html.ep
<!DOCTYPE html>
<html lang="es"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title><%= $title %> - Sipwise</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9">
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="stilearn metro admin bootstrap">
        <meta name="author" content="stilearning">
        
		<!-- Alex esto es nuevo de paquete -->
        <link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
        
         <!-- styles -->
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.css" rel="stylesheet">
        <!-- default theme -->
        <link href="css/metro-bootstrap.css" rel="stylesheet">
        <link href="css/metro.css" rel="stylesheet">
        <link href="css/metro-responsive.css" rel="stylesheet">
        <link href="css/metro-helper.css" rel="stylesheet">
        <link href="css/metro-icons.css" rel="stylesheet">
                
        <!-- other -->
        <link href="css/looper.css" rel="stylesheet">
        <link href="css/xcharts.css" rel="stylesheet">
		<!-- <link href="css/styles.css" rel="stylesheet"> -->
        <link href="css/fullcalendar.css" rel="stylesheet">
		
		<!-- Alex poneeeee -->
        <link href="css/icomoon.css" rel="stylesheet">
        
        <link rel="shortcut icon" href="images/favicon.ico">
        
    </head>
% if (session 'user') {
<body>
% } else {
<body class="bg-black">
% }
<%= content %>
<!-- Alex RECUERDA AQUI LOS JS -->
<!-- javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script type="text/javascript" src="js/widgets.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.sparkline.min.js"></script>

<script type="text/javascript" src="js/looper.min.js"></script> <!-- this required for tile multiple -->
<script type="text/javascript" src="js/jquery.knob.js"></script>

<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="js/excanvas.min.js"></script><![endif]-->
<script type="text/javascript" src="js/jquery.flot.js"></script>
<script type="text/javascript" src="js/jquery.flot.resize.js"></script> <!-- help to responsive chart -->

<script type="text/javascript" src="js/d3.v3.min.js" charset="utf-8"></script> <!-- required for use xChart -->
<script type="text/javascript" src="js/xcharts.min.js"></script>
<!-- <script type="text/javascript" src="js/xcharts.js"></script> -->
<!-- <script type="text/javascript" src="js/d3.v2.min.js"></script> -->

<script type="text/javascript" src="js/fullcalendar.min.js"></script>

<script type="text/javascript" src="js/dashboard.js"></script>
<script type="text/javascript" src="js/metro-base.js"></script>

</body>
</html>
