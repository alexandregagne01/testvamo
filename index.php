<?php

if ( version_compare( phpversion(), "5.0.0", "ge" ) ) date_default_timezone_set("America/Montreal");

if ( file_exists("ressources/css/") )
    $base = '.';
else if ( file_exists("../ressources/css/") )
    $base = '..';
else if ( file_exists("../../ressources/css/") )
    $base = '../..';
else
    $base = '.';

// entêtes
//$titre = "Visionnement et Annotation de MOdèles en 3D (VAMO3D)";
//$titre = "Visionnement et Annotation de MOdèles en Réalité Virtuelle (VAMOReVe)";
$titre = "Visionnement et Annotation de MOdèles en 3D (VAMO3D) <br>et en Réalité Virtuelle (VAMOReVe)";

echo <<<EOD
<!DOCTYPE html>
<html lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="title" content="$titre - inVisu inc." />
<link rel="stylesheet" href="$base/ressources/css/1024.css" type="text/css" media="screen" />
<link rel="stylesheet" href="$base/ressources/css/template_css.css" type="text/css" media="screen" />
<link rel="stylesheet" href="$base/ressources/css/style6.css" type="text/css" media="screen" />
<style type="text/css" media="screen">
#main-body {width:100%;}
#content{margin-right:0.5%;}
#sidebar{width:23.6%;}
</style>
<style type="text/css" media="screen">
#header {padding: 10px; height:89px;}
#header h1 {background: url($base/ressources/css/logo.png) 0 0 no-repeat;display:inline-flex;text-align:center;width:100%;}
#header h1 a{display:block;text-decoration:none;width:90px;height:89px;}
#header h1 span{width:100%;}
#header h2 {padding: 10px;}
#navmenu {height: 5px;}
#navmenu .leftbar {height: 5px;}
#navmenu .rightbar {height: 5px;}
#navmenu .a{height: 5px; line-height: 5px;}
#navmenu .a:hover{height: 5px; line-height: 5px;}
</style>
<title>$titre</title>
</head>
<body>
<div id="wrapper">
<div id="wrap-a">
<div id="wrap-b">
<div id="wrap-c">
<div id="wrap">
<div id="wrap-inner">
<div class="topbar"></div>
<div id="header">
<h1 title="$titre"><a href="https://www.invisu.ca/fr/" title="$titre"></a><span>$titre</span></h1>
</div>
EOD;

// choix du niveau
$barreverte = 1;

if ($barreverte)
{
    echo <<<EOD
<div id="navmenu">
<div class="leftbar"></div>
<ul class="menu">
EOD;
    // <li><a href="../fr/index.php"><span>Accueil</span></a></li>
    // <li><a href="../fr/produits.php" class="haschild"><span>Produits</span></a></li>
    // <li><a href="../fr/avantages.php" class="haschild"><span>Avantages</span></a>
    // <li class="active"  id="current" ><a href="../fr/services.php"><span>Services</span></a></li>
    // <li><a href="../fr/soutien.php"><span>Soutien</span></a></li>
    // <li><a href="../fr/telechargements.php"><span>Téléchargements</span></a></li>
    // <li><a href="../fr/contact.php"><span>Nous contacter</span></a></li>
    echo <<<EOD
</ul>
<div class="rightbar"></div>
</div>
EOD;
}

$uri = $_SERVER['REQUEST_URI'];
$uritok = parse_url( $uri );
$urisans = "";
$urisans .= array_key_exists('scheme', $uritok) ? $uritok['scheme'] : "";
$urisans .= array_key_exists('host', $uritok) ? $uritok['host'] : "";
$urisans .= array_key_exists('path', $uritok) ? $uritok['path'] : "";

$application = '?3D';
$niveau = '&visu';
if ( array_key_exists('query', $uritok) )
{
    parse_str( $uritok['query'], $vars );
    foreach ( $vars as $key => $value )
    {
	switch ( $key )
	{
	    default:
	    case "3D": $application = '?3D'; break;
	    case "RV": $application = '?RV'; break;
	    case "visu": $niveau = '&visu'; break;
	    case "edit": $niveau = '&edit'; break;
	    case "conc": $niveau = '&conc'; break;
	    case "aucun": $niveau = '&aucun'; break;
	}
    }
}
//echo "@ \$application = " . ($application) . " \$niveau = " . ($niveau) . "<br>";

// echo "<h4>Mon choix de menu</h4>\n";
echo "<div class=\"path\"><span class=\"pathway\">";

if ( $base != '.' )
{
    echo "<span>(<a href=\"$base\">&#8962;&nbsp;Retour</a>)</span>";
    echo "&nbsp;&nbsp;";
}

echo "<span>";
echo "App : ";
if ( !strlen( $application ) ||
     !strcmp( $application,"?3D") ) echo "<b>VAMO3D</b>"; else echo "<a href=\"$urisans?3D$niveau\">VAMO3D</a>";
echo ", ";
if ( !strcmp($application,"?RV") ) echo "<b>VAMOReVe</b>"; else echo "<a href=\"$urisans?RV$niveau\">VAMOReVe</a>";
echo ".";
echo "</span>";


//echo "<br>";
echo "&nbsp;&nbsp;&nbsp;";
echo "&nbsp;&nbsp;&nbsp;";

echo "<span>";
echo "Mon choix de menu : ";
if ( !strlen( $niveau ) ||
     !strcmp( $niveau,"&visu") ) echo "<b>visionnement</b>"; else echo "<a href=\"$urisans$application\">visionnement</a>";
echo ", ";
if ( !strcmp($niveau,"&edit") ) echo "<b>édition</b>"; else echo "<a href=\"$urisans$application&edit\">édition</a>";
echo ", ";
if ( !strcmp($niveau,"&conc") ) echo "<b>conception</b>"; else echo "<a href=\"$urisans$application&conc\">conception</a>";
echo ", ";
if ( !strcmp($niveau,"&aucun") ) echo "<b>aucun</b>"; else echo "<a href=\"$urisans$application&aucun\">aucun</a>";
echo ".";
echo "</span>";

// if ( $base != '.' )
// {
//     echo "&nbsp;&nbsp;&nbsp;&nbsp;";
//     echo "<span>(^^ <a href=\"$base\">Retour au niveau supérieur</a> ^^)</span>";
// }


// guide d'utilisation
echo "&nbsp;&nbsp;&nbsp;";
echo "&nbsp;&nbsp;&nbsp;";
echo "&nbsp;&nbsp;&nbsp;";
echo "&nbsp;&nbsp;&nbsp;";
$guide = end( glob("$base/vamo*guide_utilisation*.pdf") ); // obtenir le nom du guide le plus récent
echo "<span class=\"pathway guide\"><a href=\"$guide\">Guide d'utilisation</a></span>";

echo "</span></div>";

/// MODÈLES ANATOMIQUES

echo "<h2>Modèles 3D</h2>\n";
echo <<<EOD
<div class="inside">
<table class="contentpaneopen">
EOD;

// obtenir la liste des fichiers html en ordre alphabétique
$fns = glob("*.html");

// Coeur_stenose_mitrale
// Colon
// Male_humain
// Poumons_simplistes
// Systeme_Digestif1

// liste des objets, en utilisant le niveau
#echo "<tr><th>Editer</th><th>Voir</th></tr>\n";
$i = 0;
foreach ( $fns as $fn )
{
    $fnsansextension = basename( $fn, '.html' );
    $img = "images/" . $fnsansextension . '.jpg';
    if ( !($i%3) ) echo "<tr>\n";
    echo "<td valign=\"middle\" width=\"105px\"><a href=\"$fn$application$niveau\"><img width=\"100px\" src=\"$img\"></a></td>";
    $nom = str_replace("_"," ",$fnsansextension);
    echo "<td valign=\"middle\"><a href=\"$fn$application$niveau\">$nom</a>&nbsp;</td>\n";
    if ( !(($i+1)%3) ) echo "</tr>";
    $i++;
}
echo <<<EOD
</table>
<p></p>
<p></p>
</div>
EOD;

/// DENTAIRE
if ( file_exists( "dentaire" ) )
{
    echo "<h2>Technologie dentaire</h2>\n";
    echo <<<EOD
<div class="inside">
<p>
<table class="contentpaneopen">
<a href="dentaire">Modèles 3D en lien avec la technologie dentaire</a>...
</table>
</p>
</div>
EOD;
}

/// BODYPARTS
if ( file_exists( "bodypart" ) )
{
    echo "<h2>Parties du corps</h2>\n";
    echo <<<EOD
<div class="inside">
<p>
<table class="contentpaneopen">
<a href="bodypart">Diverses parties du corps</a>...
</table>
</p>
</div>
EOD;
}

/// LIEUX
if ( file_exists( "lieux" ) )
{
    echo "<h2>Lieux</h2>\n";
    echo <<<EOD
<div class="inside">
<p>
<table class="contentpaneopen">
<a href="lieux">Divers lieux</a>...
</table>
</p>
</div>
EOD;
}

/// HIVER
if ( file_exists( "hiver" ) )
{
    echo "<h2>Hiver</h2>\n";
    echo <<<EOD
<div class="inside">
<p>
<table class="contentpaneopen">
<a href="hiver">Hiver</a>...
</table>
</p>
</div>
EOD;
}

/// MOLÉCULES
if ( file_exists( "molecules" ) )
{
    echo "<h2>Molécules</h2>\n";
    echo <<<EOD
<div class="inside">
<p>
<table class="contentpaneopen">
EOD;

    $molecule = "00_Gabarit.html$application$niveau&";

    //echo "<p>";
    foreach (glob("objets3D/pdb/*.mol") as $fn) {
	$fnsansextension = basename( $fn, '.mol' );
	echo "<a href=\"{$molecule}fichier=pdb/{$fnsansextension}.mol&titre={$fnsansextension}\">$fnsansextension</a>&nbsp;\n";
	# {$fnsansextension} avec des {} pour ne pas inclure '.mol';
	# https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing.complex
    }
    //echo "</p>";
    echo <<<EOD
</table>
</p>
</div>
EOD;
}

// if ( $base != '.' )
// {
//     echo "<span>^^ (<a href=\"$base\">Retour au niveau supérieur</a>) ^^</span>";
// }

$dateCopyright = "© 2022-" . date("Y");
$version = file_get_contents("$base/version.txt");
echo "<div id=\"informations\">\n";
echo "<br />\n";
echo "$version<br />\n";
echo "Pour plus d'information : Chantale Nunes <a href=\"mailto:chantale.nunes@bdeb.qc.ca\">chantale.nunes@bdeb.qc.ca</a><br />\n";
echo "En cas de problème technique : <a href=\"mailto:vamo@invisu.ca\">vamo@invisu.ca</a><br />\n";
echo "</div>\n";
echo "<div id=\"footer\">\n";
echo "<br />\n";
echo "$dateCopyright - inVisu inc.<br />\n";
echo "<a href=\"https://www.invisu.ca/\">www.invisu.ca</a><br />\n";
echo "</div>\n";

echo "</div>\n";
echo "</div>\n";
echo "</div>\n";
echo "</div>\n";
echo "</div>\n";
echo "</div>\n";
//echo "<br /><br />© 2004-2022 - inVisu inc. - Tous droits réservés<br /><br /><a href=\"..\">www.invisu.ca</a><br />";
echo "</body>\n";
echo "</html>";

?>
