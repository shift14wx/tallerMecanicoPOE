package com.mecanica.org.web.rest;

import com.mecanica.org.domain.TipoAutomovil;
import com.mecanica.org.repository.TipoAutomovilRepository;
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
 * REST controller for managing {@link com.mecanica.org.domain.TipoAutomovil}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoAutomovilResource {

    private final Logger log = LoggerFactory.getLogger(TipoAutomovilResource.class);

    private static final String ENTITY_NAME = "tipoAutomovil";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoAutomovilRepository tipoAutomovilRepository;

    public TipoAutomovilResource(TipoAutomovilRepository tipoAutomovilRepository) {
        this.tipoAutomovilRepository = tipoAutomovilRepository;
    }

    /**
     * {@code POST  /tipo-automovils} : Create a new tipoAutomovil.
     *
     * @param tipoAutomovil the tipoAutomovil to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoAutomovil, or with status {@code 400 (Bad Request)} if the tipoAutomovil has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-automovils")
    public ResponseEntity<TipoAutomovil> createTipoAutomovil(@RequestBody TipoAutomovil tipoAutomovil) throws URISyntaxException {
        log.debug("REST request to save TipoAutomovil : {}", tipoAutomovil);
        if (tipoAutomovil.getId() != null) {
            throw new BadRequestAlertException("A new tipoAutomovil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoAutomovil result = tipoAutomovilRepository.save(tipoAutomovil);
        return ResponseEntity.created(new URI("/api/tipo-automovils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-automovils} : Updates an existing tipoAutomovil.
     *
     * @param tipoAutomovil the tipoAutomovil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoAutomovil,
     * or with status {@code 400 (Bad Request)} if the tipoAutomovil is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoAutomovil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-automovils")
    public ResponseEntity<TipoAutomovil> updateTipoAutomovil(@RequestBody TipoAutomovil tipoAutomovil) throws URISyntaxException {
        log.debug("REST request to update TipoAutomovil : {}", tipoAutomovil);
        if (tipoAutomovil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoAutomovil result = tipoAutomovilRepository.save(tipoAutomovil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoAutomovil.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-automovils} : get all the tipoAutomovils.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoAutomovils in body.
     */
    @GetMapping("/tipo-automovils")
    public List<TipoAutomovil> getAllTipoAutomovils() {
        log.debug("REST request to get all TipoAutomovils");
        return tipoAutomovilRepository.findAll();
    }

    /**
     * {@code GET  /tipo-automovils/:id} : get the "id" tipoAutomovil.
     *
     * @param id the id of the tipoAutomovil to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoAutomovil, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-automovils/{id}")
    public ResponseEntity<TipoAutomovil> getTipoAutomovil(@PathVariable Long id) {
        log.debug("REST request to get TipoAutomovil : {}", id);
        Optional<TipoAutomovil> tipoAutomovil = tipoAutomovilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoAutomovil);
    }

    /**
     * {@code DELETE  /tipo-automovils/:id} : delete the "id" tipoAutomovil.
     *
     * @param id the id of the tipoAutomovil to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-automovils/{id}")
    public ResponseEntity<Void> deleteTipoAutomovil(@PathVariable Long id) {
        log.debug("REST request to delete TipoAutomovil : {}", id);
        tipoAutomovilRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
