{% extends "layouts/main.swig" %}

{% block head %}
  <style>
    .footer {
      font-size: 12px;
      color: #999;
    }
  </style>
{% endblock %}

{% block body %}
  <div>
    <p>亲爱的<a href="mailto:{{email}}">{{email}}</a>：</p>
    <p>我们已经收到您的帐号激活申请，请点击以下链接激活您的帐号：</p>
    <a href="{{url}}">{{url}}</a>
    <p>如果该链接无法点击，请直接拷贝以上链接到浏览器(例如chrome)地址栏中访问</p>
    <p class="footer">此信是由 <a href="{{site}}">SOC-SOC</a> 系统发出，系统不接收回信，请勿直接回复。</p>
  </div>
{% endblock %}