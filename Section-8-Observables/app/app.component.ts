import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/range'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/retry'
import 'rxjs/add/operator/delay'

@Component({
  selector: 'my-app',
  template: `
  <div class="row">
    <div class="col-md-3">
        Observable.Interval: <strong>{{ intervalvalue }}</strong>
    </div>
    <div class="col-md-3">Observable.of("hello", "amado") <strong>{{ observableof }}</strong></div>
    <div class="col-md-3">Observable.throw(new Error("Failure ocurred.")) : <strong>{{observ.err | json}}</strong></div>
    </div>
    <div class="row">Observable.throw(new Error("error")) complete: <strong>{{observ.complete | json}}</strong></div>
    <div class="row">Observable.of("success") complete: <strong>{{observ.completesuccess | json}}</strong></div>
  <div class="row">expected timeout error (to:1000/delay:5000): <strong>{{observ.timeout | json}}</strong></div>
  <div class="row">expected timeout catch result (to:1000/delay:5000)+catch: <strong>{{observ.timeoutcatch | json}}</strong></div>
  <div class="row">Waiting for Joined Observable: <strong>{{ joinValue }}</strong></div>
  <div class="row">retry2:3Failures + 3 successes: <strong>{{ observ.retry2 | json }}</strong></div>
  <div class="row">retry3:3Failures + 3 successes: <strong>{{ observablefailure | json }}</strong></div>
  <div class="row">catch+retry2:3Failures + 3 successes: <strong>{{ observ.retry2catch | json }}</strong></div>
  <div class="row">catch+retry3:fail(1,2,5,8): <strong>{{ observ.retry3catch | json }}</strong></div>
  <div class="row"><div class="col-md-3">

    <h5>Default Observable valueChanges</h5>
  <form [formGroup]="form">
    <input type="text" formControlName="search">
    <div *ngFor="let observed of observedValues">
        {{observed}}
    </div>
  </form>

  </div>
  <div class="col-md-3">
    <h5>Debounced, Mapped</h5>
    <div *ngFor="let observed of observedValues2">
        {{observed}}
    </div>
  </div>
  <div class="col-md-3">
    <h5>Array mapped with "mapping " prefix.</h5>
    <div *ngFor="let observed of observedValues3">
        {{observed}}
    </div>
  </div>
  <div class="col-md-3">
    <h5>Observable Creation Tests</h5>
    <div *ngFor="let observed of observedValues4">
        {{observed | json}}
    </div>
  </div>
  </div>
  `
})
export class AppComponent {
    sampleArray: Date[];
    intervalvalue = 0;

    joinValue = "waiting..";
    observablefailure   = [];

    form : FormGroup;
    observedValues = [];
    observedValues2 = [];
    observedValues3 = [];
    observedValues4 = [];
    observableof = [];
    observ  = { err: "", retry2: [], retry2catch: [], retry3catch:[], timeout: [], timeoutcatch: [],
        complete: [], completesuccess: []};

  constructor(fb: FormBuilder){
      this.form = fb.group(
          { search : [] }
      );
      var search = this.form.get('search');
        search.valueChanges.subscribe(x => this.observedValues.push(x));
      search.valueChanges.debounceTime(400).map(str => (<string>str).replace(' ', '-')).subscribe(x => this.observedValues2.push(x));
      search.valueChanges.map(str => 'mapping ' + str).subscribe(v => this.observedValues3.push(v));

      //console.log(Observable.range);
      Observable.range(1,5).map( n => {
          var d = new Date();
          d.setDate(d.getDate()+n);
          return d;
      }).subscribe(v => this.observedValues4.push(v));

      var tempArray = ['arritem1'];
      Observable.from(tempArray).subscribe(v => this.observedValues4.push(v));
      let intobservable = Observable.interval(2000);
        intobservable.subscribe(n => this.intervalvalue += n);

      Observable.forkJoin(Observable.of("delay 3000").delay(300), Observable.of("delay 2000").delay(900))
          .subscribe(joinVal => this.joinValue = joinVal.join(", "));

      Observable.of("hello", "amado").subscribe( el => this.observableof.push(el));

      this.observ.err = "";
      Observable.throw(new Error("Failure ocurred"))
          .subscribe(x => console.log(x), e => this.observ.err = "error(): " + e.message);

      this.retry2(this.observ.retry2);
      this.retry3();
      this.retry2catch(this.observ.retry2catch);
      this.retry3catch(this.observ.retry3catch);
      this.observtimeout(this.observ.timeout);
      this.observtimeoutcatch(this.observ.timeoutcatch);
      this.observcomplete(this.observ.complete);
      this.observcompletesuccess(this.observ.completesuccess);
  }
    observcompletesuccess(wherelog){
        Observable.of("success").subscribe(
          x => wherelog.push(x),
            e => wherelog.push("error(): " + e.message),
            () => wherelog.push("complete()")
        );
    }
    observcomplete(wherelog){
        Observable.throw(new Error("ThrownError")).subscribe(
            x => wherelog.push(x),
            e => wherelog.push("error(): " + e.message),
            () => wherelog.push("complete()")
        );
    }
    observtimeoutcatch(wherelog){
        Observable.of("timeout-result").delay(5000).timeout(1000)
            .catch(error => {
                    //wherelog.push("Catch():" + error.message)
                return Observable.of("Catch()")
            })
            .subscribe(x => wherelog.push("No error:" + x), error => wherelog.push("error(): " + error.message));
    }
    observtimeout(wherelog){
        Observable.of("timeout-result").delay(5000).timeout(1000)
            .subscribe(x => wherelog.push("No error:" + x), error => wherelog.push("error(): " + error.message));
    }

    retry3catch(wherelog){
    var ctr = 0;

    Observable.of("success1","success2", "success3")// Observable.throw(new Error("TSWO"))
        .mergeMap( (m) => {
            ++ctr;
            if(ctr == 1 || ctr == 2 || ctr == 5 || ctr == 8)
            {
                return Observable.throw(new Error("Failed request."));
            }

            //console.log("Mapping " + m + "/" + ctr);
            return Observable.of(m +" (Try#" + (ctr) +")"); // Observable.of([1,2,3]);
        })
        .retry(3).catch(err => {
            return Observable.of("Catch():"+err.message)
        })
        .subscribe(x => wherelog.push(x) , err => {
                //console.error(err);
                wherelog.push("error():" + err.message);
            }
        );
}
    retry2catch(wherelog){
    var ctr = 0;

    Observable.of("success1","success2", "success3")// Observable.throw(new Error("TSWO"))
        .mergeMap( (m) => {
            if(++ctr <= 3)
            {
                return Observable.throw(new Error("Failed request."));
            }

            //console.log("Mapping " + m + "/" + ctr);
            return Observable.of(m +" (Try#" + (ctr) +")"); // Observable.of([1,2,3]);
        })
        .retry(2).catch(err => {
            return Observable.of("Catch()")
        })
        .subscribe(x => wherelog.push(x) , err => {
                //console.error(err);
                wherelog.push("error():" + err.message);
            }
        );
}

    retry2(wherelog){
        var ctr = 0;

        Observable.of("success1","success2", "success3")// Observable.throw(new Error("TSWO"))
            .mergeMap( (m) => {
                if(++ctr <= 3)
                {
                    return Observable.throw(new Error("Failed request."));
                }

                //console.log("Mapping " + m + "/" + ctr);
                return Observable.of(m +" (Try#" + (ctr) +")"); // Observable.of([1,2,3]);
            })
            .retry(2)
            .subscribe(x => wherelog.push(x) , err => {
                    //console.error(err);
                    wherelog.push("error(): " + err.message);
                }
            );
    }

    retry3(){
        var ctr = 0;

        Observable.of("success1","success2", "success3")// Observable.throw(new Error("TSWO"))
            .mergeMap( (m) => {
                if(++ctr <= 3)
                {
                    return Observable.throw(new Error("Failed request."));
                }

                //console.log("Mapping " + m + "/" + ctr);
                return Observable.of(m +" (Try#" + (ctr) +")"); // Observable.of([1,2,3]);
            })
            .retry(3)
            .subscribe(x => this.observablefailure.push(x) , err => {
                    //console.error(err);
                    this.observablefailure.push(err.message);
                }
            );
    }
}
