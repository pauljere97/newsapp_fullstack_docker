<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;


class ApiController extends Controller{
    public function get_news_feed(Request $request){
        $feed = [];
        $newyorkTimeReqErrorMessage = '';
        $index = 0;
        // NEW YORK TIMES API REQUEST
        try {
            $filter = [];
            $filter['api-key'] = env('NEW_YORK_TIMES_KEY');
            $filter['sort'] = 'newest';
            $filter['page'] = $request['page'];
            if(isset($request['q']) && $request['q']) $filter['q'] = $request['q'];
            if(isset($request['source']) && $request['source']) $filter['fq'] = 'source:("'. $request['source'].'")';
            if(isset($request['category']) && $request['category']) $filter['fq'] = 'section_name:("'. $request['category'].'")';
            if(isset($request['author']) && $request['author']) $filter['fq'] = 'byline:("'. $request['author'].'")';
            if(isset($request['date_to']) && $request['date_to']) $filter['end_date'] = str_replace('-', '', $request['date_to']);
            if(isset($request['date_from']) && $request['date_from'])  $filter['begin_date'] = str_replace('-', '', $request['date_from']);
            $response = Http::get(env('NEW_YORK_TIMES'), $filter);
            if($response->status() == 200){
                $data = $response->json();
                $index = sizeof($feed);
                foreach ($data['response']['docs'] as $value) {
                    $article = [];
                    $article['image'] = null;
                    if(sizeof($value['multimedia'])){
                        $article['image'] = 'https://www.nytimes.com/' . $value['multimedia'][0]['url'];
                    }
                    $article['id'] = $value['_id'];
                    $article['title'] = $value['headline']['main'];
                    $article['author'] = substr($value['byline']['original'], 3);
                    $article['date'] = strtotime($value['pub_date']) * 1000;
                    $article['desc'] = $value['lead_paragraph'];
                    $article['source'] = $value['source'];
                    $article['url'] = $value['web_url'];
                    $article['category'] = $value['section_name'];
                    $feed[$index] = $article;
                    $index++;
                }
            }
        } catch (RequestException $e) {
            $newyorkTimeReqErrorMessage = $e->getMessage();
        }

        $newsApiReqErrorMessage = '';
        try {
            $filter = [];
            $filter['apiKey'] = env('NEWS_API_KEY');
            $filter['sortBy'] = 'publishedAt';
            $filter['page'] = $request['page'];
            if(isset($request['q']) && $request['q']) $filter['q'] = $request['q'];
            if(isset($request['source']) && $request['source']) $filter['sources'] = str_replace(' ', '-', strtolower($request['source']));
            if(isset($request['date_from']) && $request['date_from']) $filter['from'] = $request['date_from'];
            if(isset($request['date_to']) && $request['date_to']) $filter['to'] = $request['date_to'];
            if(isset($request['category']) && $request['category']) $filter['category'] = $request['category'];
            if(isset($request['author']) && $request['author']) $filter['domains'] = $request['author'];
          
            $response = Http::get(env('NEWS_API'), $filter);
            if($response->status() == 200){
                $data = $response->json();
                $index = sizeof($feed);
                foreach ($data['articles'] as $value) {
                    $article = [];
                    $article['id'] = rand(1,1000).$value['title'];
                    $article['image'] = $value['urlToImage'];
                    $article['title'] = $value['title'];
                    $article['author'] = $value['author'];
                    $article['date'] = strtotime($value['publishedAt']) * 1000;
                    $article['desc'] = $value['content'];
                    $article['source'] = $value['source']['name'];
                    $article['url'] = $value['url'];
                    $article['category'] = 'Other';
                    $feed[$index] = $article;
                    $index++;
                }
            }
            if($response->failed() || !$response->successful()){
                $newsApiReqErrorMessage = $response->json()['message'];
            }
        } catch (RequestException $e) {
            $newsApiReqErrorMessage = $e->getMessage();
        }

        $gNewsReqErrorMessage = '';
        if($request['page'] == 1){
            try {
                $filter = [];
                $filter['token'] = env('G_NEWS_KEY');
                $filter['q'] = $request['q'];
                $filter['sortby'] = $request['publishedAt'];
                if(isset($request['date_from']) && $request['date_from']) $filter['from'] = $request['date_from'];
                if(isset($request['date_to']) && $request['date_to']) $filter['to'] = $request['date_to'];
                if(!$request['q'] && $request['category']) $filter['q'] = $request['category'];
                $response = Http::get(env('G_NEWS'), $filter);
                if($response->status() == 200){
                    $data = $response->json();
                    $index = sizeof($feed);
                    foreach ($data['articles'] as $value) {
                        $article = [];
                        $article['id'] = rand(1,1000).$value['title'];
                        $article['image'] = $value['image'];
                        $article['title'] = $value['title'];
                        $article['author'] = $value['source']['name'];
                        $article['date'] = strtotime($value['publishedAt']) * 1000;
                        $article['desc'] = $value['content'];
                        $article['source'] = $value['source']['name'];
                        $article['url'] = $value['url'];
                        $article['category'] = 'Other';
                        $feed[$index] = $article;
                        $index++;
                    }
                }else{
                    $gNewsReqErrorMessage = $response->json()['errors'];
                }
            } catch (RequestException $e) {
                $gNewsReqErrorMessage = $e->getMessage();
            }
        }

        $guardianReqErrorMessage = '';
        try {
            $filter = [];
            $filter['api-key'] = env('GUARDIAN_NEWS_KEY');
            $filter['q'] = $request['q'];
            $filter['page'] = $request['page'];
            if(isset($request['date_from']) && $request['date_from']) $filter['from-date'] = $request['date_from'];
            if(isset($request['date_to']) && $request['date_to']) $filter['to-date'] = $request['date_to'];
            if(!$request['q'] && $request['category']) $filter['q'] = $request['category'];
            $response = Http::get(env('GUARDIAN_NEWS'), $filter);
            if($response->status() == 200){
                $data = $response->json();
                $index = sizeof($feed);
                foreach ($data['response']['results'] as $value) {
                    $article = [];
                    $article['id'] = $value['id'];
                    $article['title'] = $value['webTitle'];
                    $article['author'] = 'The Guardian';
                    $article['date'] = strtotime($value['webPublicationDate']) * 1000;
                    $article['desc'] = $value['webUrl'];
                    $article['source'] = 'The Guardian';
                    $article['url'] = $value['webUrl'];
                    $article['image'] = null;
                    $article['category'] = $value['sectionName'];
                    $feed[$index] = $article;
                    $index++;
                }
            }
        } catch (RequestException $e) {
            $guardianReqErrorMessage = $e->getMessage();
        }

        return response()->json([
            'index'=>$index,
            'total'=>sizeof($feed),
            'feed'=>$feed,
            'newsApiReqErrorMessage'=>$newsApiReqErrorMessage,
            'guardianReqErrorMessage'=>$guardianReqErrorMessage,
            'newyorkTimeReqErrorMessage'=>$newyorkTimeReqErrorMessage,
            'gNewsReqErrorMessage'=>$gNewsReqErrorMessage,
        ]);
    }

    public function createPrefereces(Request $request){
        $user_preference = UserPreference::where(['user_id' => $request['user_id']])->get()->first();
        if($user_preference){
            try{
                UserPreference::where('user_id', $request['user_id'])->update([
                    'source' => $request['source'],
                    'category' => $request['category'],
                    'author' => $request['author'],
                ]);
            }catch(\Exception $e){
                return response()->json([
                    'update_error'=>$e->getMessage(),
                ]);
            }
        }else{
            try{
                UserPreference::insert([
                    'user_id' => $request['user_id'],
                    'source' => $request['source'],
                    'category' => $request['category'],
                    'author' => $request['author'],
                ]);
            }catch(\Exception $e){
                return response()->json([
                    'create_error'=>$e->getMessage(),
                ]);
            }
        }
        
        $user_preference = UserPreference::where(['user_id' => $request['user_id']])->get()->first();
        return response()->json([
            'preference'=>$user_preference,
        ]);
    }
}
