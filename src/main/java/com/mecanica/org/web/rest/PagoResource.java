package com.mecanica.org.web.rest;

import com.mecanica.org.domain.Pago;
import com.mecanica.org.repository.PagoRepository;
import com.mecanica.org.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mecanica.org.domain.Pago}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PagoResource {

    private final Logger log = LoggerFactory.getLogger(PagoResource.class);

    private static final String ENTITY_NAME = "pago";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagoRepository pagoRepository;

    public PagoResource(PagoRepository pagoRepository) {
        this.pagoRepository = pagoRepository;
    }

    /**
     * {@code POST  /pagos} : Create a new pago.
     *
     * @param pago the pago to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pago, or with status {@code 400 (Bad Request)} if the pago has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pagos")
    public ResponseEntity<Pago> createPago(@RequestBody Pago pago) throws URISyntaxException {
        log.debug("REST request to save Pago : {}", pago);
        if (pago.getId() != null) {
            throw new BadRequestAlertException("A new pago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pago result = pagoRepository.save(pago);
        return ResponseEntity.created(new URI("/api/pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pagos} : Updates an existing pago.
     *
     * @param pago the pago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pago,
     * or with status {@code 400 (Bad Request)} if the pago is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pagos")
    public ResponseEntity<Pago> updatePago(@RequestBody Pago pago) throws URISyntaxException {
        log.debug("REST request to update Pago : {}", pago);
        if (pago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pago result = pagoRepository.save(pago);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pago.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pagos} : get all the pagos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagos in body.
     */
    @GetMapping("/pagos")
    public List<Pago> getAllPagos( @RequestParam(required = false) String averiaId ) {
        log.info("mostrar pagos de averia: " +averiaId);
        if( averiaId != null ){
            log.info("retornando todos los pagos de una averia con id: "+averiaId);
            return pagoRepository.findByAveriaId( Long.parseLong(averiaId) );
        }
        log.debug("REST request to get all Pagos");
        return pagoRepository.findAll();
    }

    /**
     * {@code GET  /pagos/:id} : get the "id" pago.
     *
     * @param id the id of the pago to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pago, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pagos/{id}")
    public ResponseEntity<Pago> getPago(@PathVariable Long id) {
        log.debug("REST request to get Pago : {}", id);
        Optional<Pago> pago = pagoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pago);
    }

    /**
     * {@code DELETE  /pagos/:id} : delete the "id" pago.
     *
     * @param id the id of the pago to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pagos/{id}")
    public ResponseEntity<Void> deletePago(@PathVariable Long id) {
        log.debug("REST request to delete Pago : {}", id);
        pagoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
