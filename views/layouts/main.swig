<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="author" content="liliang">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>
    {% block title %}{% endblock %}
  </title>
  <link href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  {% block head %}{% endblock %}
</head>
<body>
  <div class="container">
    {% block body %}{% endblock %}
  </div>
</body>
</html>