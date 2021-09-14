<template>
  <footer class="footer">
    <div class="container">
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-12">
          <h4 class="text-primary font-weight-light mb-2">
            Bedankt voor het gebruiken van de Bullshit Generator
          </h4>
          <h5 class="mb-0 font-weight-light">
            De generator is gebaseerd op de adviesmatrix van
            <a href="http://www.jurgensland.nl/download/adviesmatrix.pdf"> jurgensland</a>.
          </h5>
        </div>
      </div>
      <hr>
      <div class="row align-items-center justify-content-md-between">
        <div class="col">
          <div class="copyright">
            &copy; {{ year }}
            <a href="https://www.takovermeulen.eu" target="_blank" rel="noopener">zzyzx</a>
          </div>
        </div>

        <div class="col">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a
                target="_blank"
                rel="noopener"
                href="https://www.facebook.com/takovermeulen"
                class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-sm"
                data-toggle="tooltip"
                data-original-title="Like us"
              >
                <i class="fab fa-facebook-square" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'BullshitFooter',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style>
</style>
