from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import dateutil.parser
import datetime



# Create your views here.
def index(request):
  # return HttpResponse("hee;oe")
  return render_to_response( 'index.html', {}, RequestContext(request) )


def search_repos(request):
  postData = request.GET
  searchKey = postData.get('key')
  repoItem = {}

  r = requests.get('https://api.github.com/search/repositories?q='+searchKey)
  if(r.ok):
    repoItem = json.loads(r.text or r.content)
  else:
    repoItem['items'] = {}
    
  return render_to_response( 'search_repos.html', {'repositories' : repoItem['items']}, RequestContext(request) )

def search_issues(request):
  postData = request.GET
  searchKey = postData.get('key')
  repoItem = {}
  now = datetime.datetime.now()

  r = requests.get('https://api.github.com/search/issues?q=+state:open+created:'+ now.strftime("%Y-%m-%d") +'+type:issue+repo:'+searchKey)
  if(r.ok):
    repoItem = json.loads(r.text or r.content)
  else:
    repoItem['items'] = null

  return render_to_response( 'search_issues.html', {'issues' : repoItem['items'], 'reponame' : searchKey }, RequestContext(request) )

def issue(request, owner, reponame, number):
  repoItem = {}
  r = requests.get('https://api.github.com/repos/' + owner + "/" + reponame + '/issues/' + number)
  if(r.ok):
    repoItem = json.loads(r.text or r.content)
  else:
    repoItem['created_at'] = null
    
  repoItem['created_at'] = dateutil.parser.parse(repoItem['created_at'])
  return render_to_response( 'issue.html', {'issue' : repoItem}, RequestContext(request) )

def user(request, userid):
  repoItem = {}
  r = requests.get('https://api.github.com/users/' + userid)
  if(r.ok):
    repoItem = json.loads(r.text or r.content)
    
  repoItem['created_at'] = dateutil.parser.parse(repoItem['created_at'])
  return render_to_response( 'user.html', {'user' : repoItem}, RequestContext(request) )