{% extends "layouts/main.swig" %}

{% block title %}
  {{title}}
{% endblock %}

{% block body %}
  <div class="jumbotron">
    <h3>欢迎你的加入</h3>
    {% if flash %}
      <div class="alert alert-{{flash.type}}" role="alert">
        <p>{{flash.msg}}</p>
      </div>
    {% endif %}
    <p>
      <a class="btn btn-primary" href="/" role="button">首页</a>
      <a class="btn btn-primary" href="/entry/login" role="button">登录</a>
    </p>
  </div>
{% endblock %}