// 
window.addEventListener("load",run,false);
var nbu = 1;
const base = 10;
var tj = "jeton";
var etat = 1; 

	// ajout des jetons "unités" et lignes
	function ajouteUnite(nb) {
		//console.log("ajoute unité nbu=",nbu)
		// création unité
		var jeton = document.createElement("span");
		jeton.setAttribute("class","jeton2");
		// création case vide unité
		var demi = document.createElement("span");
		demi.setAttribute("class","demi");
		// ajout
		document.getElementById("unite").appendChild(demi);
		document.getElementById("unite").appendChild(jeton);
		// création  lignes
		var calc = document.createElement("div");
		calc.setAttribute("id","p"+nb);
		calc.setAttribute("ondrop","dropJeton(event)");
		calc.setAttribute("ondragover","allowDrop(event)");
		calc.setAttribute("onclick","suprime(event)");
		var calcdemi = document.createElement("div");
		calcdemi.setAttribute("id","d"+nb);
		calcdemi.setAttribute("ondrop","dropJeton(event)");
		calcdemi.setAttribute("ondragover","allowDrop(event)");
		calcdemi.setAttribute("onclick","suprime(event)");
		var nombre = document.createElement("div");
		nombre.setAttribute("id","np"+nb);
		var nombredemi = document.createElement("div");
		nombredemi.setAttribute("id","nd"+nb);
		fc = document.getElementById("calcul").firstChild;
		document.getElementById("calcul").insertBefore(calc,fc);
		document.getElementById("calcul").insertBefore(calcdemi,calc);
		fc = document.getElementById("nombre").firstChild;
		document.getElementById("nombre").insertBefore(nombre,fc);
		document.getElementById("nombre").insertBefore(nombredemi,nombre);
		nbu++;
	}
	
	// ajout 
	function ajouteJeton(id,nb) {
		//console.log("id=",id,"nb=",nb,"type jeton=",tj);
		//message( "ajout de "+nb+" jeton(s) en position "+id[1]);
		for (var i=0;i<nb;i++) {
			var jeton = document.createElement("span");
			jeton.setAttribute("class",tj);
			//console.log("ajouteJeton=",id);
			// interdire les 5
			if (id[0]!="X") {
				document.getElementById(id).appendChild(jeton);
			}
			//document.getElementById("message").innerHTML = "ajout d'un jeton en position "+id[1];
		}
		recalcul();
		if (etat==1) {
			document.getElementById("bouton1").style.visibility = "visible";
			etat++;
		}
	}
	
	// ajout drop	
	function allowDrop(evt) {
		evt.preventDefault();
	}

	function dropUnite(evt) {
		//console.log("drop unité",evt.target);
		ajouteUnite(nbu);
		document.getElementById("message").innerHTML = "nombre à "+(nbu-1)+" chiffre(s)";
	}
	
	function dropJeton(evt) {
		//console.log("drop jeton",evt.target);
		ajouteJeton(evt.target.id,1);
	}
	
	function debutdrag(evt) {
		tj = evt.target.getAttribute("class");
		//console.log("debutdrag",evt.target.getAttribute("class"));
	}
	
	function suprime(evt) {
		//console.log("supprime");
		evt.target.remove();
		recalcul();
	}
	
	function deuxieme() {
		tspan = document.querySelectorAll("#calcul span");
		console.log("deuxieme",tspan.length);
		for (let i=0;i<tspan.length;i++) {
			//console.log(tspan[i]);
			tspan[i].className = "jeton3";
		}
		document.getElementById("bouton1").style.visibility = "hidden";
		document.getElementById("bouton2").style.visibility = "visible";
		tspan = document.querySelectorAll('#nombre [id^="np"]');
		for (let i=0;i<tspan.length;i++) {
			tspan[i].innerHTML = "0";
		}
	}
	
	async function addition(j) {
		tj = "jeton";
		document.getElementById("bouton2").style.visibility = "hidden";
		// remet les jetons initiaux
		tjeton = document.querySelectorAll("span.jeton3");
		for (let i=0;i<tjeton.length;i++) {
			tjeton[i].className = "jeton";
		}
		console.log("reduit ligne",j);
		//document.querySelectorAll("#p"+i+" span.jeton").length
		//document.getElementById("message").innerHTML = "";
		tspan = document.querySelectorAll("#p"+j+" span");
		nb = tspan.length;
		dd = Math.floor(nb/base);
		reste = nb % base;
		if (dd != 0) {
			message("Suppression de "+(dd*base)+" jetons du ranc "+j);
		}
		for (i=0;i<dd*base;i++) {
			tspan[i].remove();
			await waitforme(200);
		}
		nid = parseInt(j)+1
		if (dd != 0) {
			message("ajout de "+dd+" jetons du ranc "+nid);
		}
		ajouteJeton("p"+nid,dd);
		recalcul()
		j++;
		if (j<nbu)
			setTimeout('addition('+j+')',4000);
		else
			message("fin du calcul");
	}
	async function addition2(j) {
		tj = "jeton";
		document.getElementById("bouton2").style.visibility = "hidden";
		// remet les jetons initiaux
		tjeton = document.querySelectorAll("span.jeton3");
		for (let i=0;i<tjeton.length;i++) {
			tjeton[i].className = "jeton";
		}
		console.log("reduit ligne",j);
		// étape 1
		tpspan = document.querySelectorAll("#p"+j+" span");
		nb = tpspan.length;
		dd = Math.floor(nb/5);
		reste = nb % base;
		console.log("p=",nb,dd,reste);
		if (dd != 0) {
			message("Suppression de "+(dd*5)+" jetons du ranc "+j+" base");
			for (i=0;i<dd*5;i++) {
				tpspan[i].remove();
				await waitforme(200);
			}
		}
		ajouteJeton("d"+j,dd);
		// étape 2
		tdspan = document.querySelectorAll("#d"+j+" span");
		nb = tdspan.length;
		dd = Math.floor(nb/2);
		reste = nb % 2;
		console.log("s=",nb,dd,reste);
		if (dd != 0) {
			message("Suppression de "+(dd*2)+" jetons du ranc "+j+" demi");
			for (i=0;i<dd*2;i++) {
				tdspan[i].remove();
				await waitforme(200);
			}
		}		
		nid = parseInt(j)+1
		if (dd != 0) {
			message("ajout de "+dd+" jetons au ranc "+nid);
		}
		nid = parseInt(j)+1
		ajouteJeton("p"+nid,dd);
		recalcul()
		j++;
		if (j<nbu)
			setTimeout('addition('+j+')',4000);
		else
			message("fin du calcul");
	}
	
	function raz() {
		console.log("supprime");
		tu = document.querySelectorAll("#unite span");
		console.log("--",tu.length)
		for (i=0;i<tu.length;i++) {
			tu[i].remove();
		}
		tc = document.querySelectorAll("#calcul div");
		console.log("--",tc.length)
		for (i=0;i<tc.length;i++) {
			tc[i].remove();
		}
		tn = document.querySelectorAll("#nombre div");
		console.log("--",tn.length)
		for (i=0;i<tn.length;i++) {
			tn[i].remove();
		}
		document.getElementById("bouton1").style.visibility = "hidden";
		document.getElementById("bouton2").style.visibility = "hidden";
		document.getElementById("message").innerHTML = "";
		etat = 1;
	}
		
	function changeBase(evt) {
		base = parseInt(evt.target.value);
		console.log(evt.target.value);
	}
	
	function recalcul() {
		console.log("recalcul");
		for (i=1;i<nbu;i++) {
			nbd = document.querySelectorAll("#d"+i+" span.jeton").length;
			nbp = document.querySelectorAll("#p"+i+" span.jeton").length;
			//console.log("rec p=",i,nbj);
			document.getElementById("np"+i).innerHTML = nbp+nbd*5;
			//console.log("rec d=",i,nbj);
			//document.getElementById("nd"+i).innerHTML = nbj;
		}
	}
		
	function message(chaine) {
		elt = document.getElementById("message")
		elt.innerHTML = elt.innerHTML+"<br/>"+chaine;
		elt.scrollTop = elt.scrollHeight;
	}

	function waitforme(millisec) {
		return new Promise(resolve => {
			setTimeout(() => { resolve('') }, millisec);
		})
	}
	
	async function ajouteNombre(nb) {
		pos = 1;
		while (nb>0) {
			console.log(nb);
			r = nb % 10;
			message("ajout de "+r+" jeton(s) au ranc "+pos);
			ajouteJeton("p"+pos,r);
			pos = pos + 1;
			await waitforme(2000);
			nb = Math.trunc(nb/10);
		}
		recalcul();
	}
  
	async function automatique(nb1,nb2) {
		// ajout des jetons de repère
		t = Math.trunc(Math.log10(nb1+nb2))+1;
		for (let i=1;i<=t;i++) {
			message("Ajout d'un repère au ranc "+i);
			ajouteUnite(i);
			await waitforme(1000);
		}
		// ajout des nombres
		pos = 1;
		while (nb1>0) {
			console.log(nb1);
			r = nb1 % 10;
			message("ajout de "+r+" jeton(s) au ranc "+pos);
			ajouteJeton("p"+pos,r);
			pos = pos + 1;
			await waitforme(2000);
			nb1 = Math.trunc(nb1/10);
		}
		recalcul();
		message("fin ajout premier nombre");
		await waitforme(1000);
		pos = 1;
		while (nb2>0) {
			console.log(nb2);
			r = nb2 % 10;
			message("ajout de "+r+" jeton(s) au ranc "+pos);
			ajouteJeton("p"+pos,r);
			pos = pos + 1;
			await waitforme(2000);
			nb2 = Math.trunc(nb2/10);
		}
		recalcul();
		message("fin ajout deuxième nombre");
		await waitforme(1000);
		// calcul
		addition(1);
	}
 
	function faireAddition() {
		nb1 = document.getElementById("nb1").value;
		nb2 = document.getElementById("nb2").value;
		automatique(nb1,nb2);
	}
		
function run(){
	message("placer le nombre de repères nécessaires en prennant un jeton dans la bourse et en le plaçant dans la zone violette");
	message("placer ensuite les jetons dans la zone rouge pour indiquer les nombres");
	//automatique(99,29);
}
