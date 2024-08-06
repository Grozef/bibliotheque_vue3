<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="page-wrapper">

<!-- Header -->
  <section id="header">

    <!-- Logo -->
      <h1><a href="index.html">Bibliothèque</a></h1>

    <!-- Nav -->
      <nav id="nav">
        <ul>
          <li>
            <router-link to="/" class="current">Accueil</router-link>
          </li>
          <!-- <li class="current"><a href="index.html">Liste des livres</a></li> -->
          <li><router-link to="/books">Liste des livres</router-link></li>
        </ul>
      </nav>

    <!-- Banner -->
    <RouterView />

    <!-- Intro -->


  </section>

<!-- Footer -->
  <section id="footer">
    <div class="container">
      <div class="row">						
        <div class="col-12">

          <!-- Copyright -->
            <div id="copyright">
              <ul class="links">
                <li>&copy; by Grozef. All rights belong to Thinkedou The Great.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>
            </div>

        </div>
      </div>
    </div>
  </section>

</div>
</template>

<style scoped>
</style>
