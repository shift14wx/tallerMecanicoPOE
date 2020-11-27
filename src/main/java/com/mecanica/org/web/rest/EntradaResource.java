package com.mecanica.org.web.rest;

import com.mecanica.org.domain.Entrada;
import com.mecanica.org.repository.EntradaRepository;
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
 * REST controller for managing {@link com.mecanica.org.domain.Entrada}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntradaResource {

    private final Logger log = LoggerFactory.getLogger(EntradaResource.class);

    private static final String ENTITY_NAME = "entrada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntradaRepository entradaRepository;

    public EntradaResource(EntradaRepository entradaRepository) {
        this.entradaRepository = entradaRepository;
    }

    /**
     * {@code POST  /entradas} : Create a new entrada.
     *
     * @param entrada the entrada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entrada, or with status {@code 400 (Bad Request)} if the entrada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entradas")
    public ResponseEntity<Entrada> createEntrada(@RequestBody Entrada entrada) throws URISyntaxException {
        log.debug("REST request to save Entrada : {}", entrada);
        if (entrada.getId() != null) {
            throw new BadRequestAlertException("A new entrada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Entrada result = entradaRepository.save(entrada);
        return ResponseEntity.created(new URI("/api/entradas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entradas} : Updates an existing entrada.
     *
     * @param entrada the entrada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entrada,
     * or with status {@code 400 (Bad Request)} if the entrada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entrada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entradas")
    public ResponseEntity<Entrada> updateEntrada(@RequestBody Entrada entrada) throws URISyntaxException {
        log.debug("REST request to update Entrada : {}", entrada);
        if (entrada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Entrada result = entradaRepository.save(entrada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entrada.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entradas} : get all the entradas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entradas in body.
     */
    @GetMapping("/entradas")
    public List<Entrada> getAllEntradas( @RequestParam(required = false) Long averiaId ) {
        log.debug("REST request to get all Entradas");
        if( averiaId != null && averiaId > 0 ){
            log.info("find by averia retorned");
            return entradaRepository.findByAveriaId(averiaId);
        }
        return entradaRepository.findAll();
    }

    /**
     * {@code GET  /entradas/:id} : get the "id" entrada.
     *
     * @param id the id of the entrada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entrada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entradas/{id}")
    public ResponseEntity<Entrada> getEntrada(@PathVariable Long id) {
        log.debug("REST request to get Entrada : {}", id);
        Optional<Entrada> entrada = entradaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entrada);
    }

    /**
     * {@code DELETE  /entradas/:id} : delete the "id" entrada.
     *
     * @param id the id of the entrada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entradas/{id}")
    public ResponseEntity<Void> deleteEntrada(@PathVariable Long id) {
        log.debug("REST request to delete Entrada : {}", id);
        entradaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
