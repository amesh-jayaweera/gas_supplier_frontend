import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../components/admin/canvasjs.min';
import { CompanyService } from 'src/app/services/company.service';
import { Graph } from 'src/app/modules/Graph';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service : CompanyService) { }

  graph : Graph[] = [];

  ngOnInit(): void {

    this.service.grahData().subscribe(x=> {
       this.graph = [];
       this.graph = x;

       var FLAT = 0;
       var TERRANCE = 0;
       var SEMIDETACHED = 0
       var DETACHED = 0

       var onebedrooms = 0;
       var twobedrooms = 0;
       var threeormorebedrooms = 0;

       for(let i=0;i<this.graph.length;i++) {
         if(this.graph[i].house_type == 'FLAT') {
            FLAT += 1;
         } else if(this.graph[i].house_type == 'TERRANCE') {
           TERRANCE += 1;
         } else if(this.graph[i].house_type == 'DETACHED') {
            DETACHED += 1;
         } else {
            SEMIDETACHED += 1;
         }

         if(this.graph[i].bedrooms == 1) {
            onebedrooms += 1;
         } else if(this.graph[i].bedrooms == 2) {
            twobedrooms += 1;
         } else {
            threeormorebedrooms += 1;
         }

       }

       // create graph for house types
       let chart = new CanvasJS.Chart("houetypes", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "House Types"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: {y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [
            { y: FLAT, name: "FLAT" },
            { y: TERRANCE, name: "TERRANCE" },
            { y: SEMIDETACHED, name: "SEMI-DETACHED" },
            { y: DETACHED, name: "DETACHED" }
          ]
        }]
      });
        
      chart.render();


      // create graph for house types
      let chart1 = new CanvasJS.Chart("bedrooms", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Bed Rooms"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: {y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [
            { y: onebedrooms, name: "1 Bed Room" },
            { y: twobedrooms, name: "2 Bed Rooms" },
            { y: threeormorebedrooms, name: "3 or More Bed Rooms" }
          ]
        }]
      });
        
      chart1.render();


    }); // end service

  }

}
