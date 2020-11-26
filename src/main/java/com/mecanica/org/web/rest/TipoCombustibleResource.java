package com.mecanica.org.web.rest;

import com.mecanica.org.domain.TipoCombustible;
import com.mecanica.org.repository.TipoCombustibleRepository;
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
 * REST controller for managing {@link com.mecanica.org.domain.TipoCombustible}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoCombustibleResource {

    private final Logger log = LoggerFactory.getLogger(TipoCombustibleResource.class);

    private static final String ENTITY_NAME = "tipoCombustible";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoCombustibleRepository tipoCombustibleRepository;

    public TipoCombustibleResource(TipoCombustibleRepository tipoCombustibleRepository) {
        this.tipoCombustibleRepository = tipoCombustibleRepository;
    }

    /**
     * {@code POST  /tipo-combustibles} : Create a new tipoCombustible.
     *
     * @param tipoCombustible the tipoCombustible to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoCombustible, or with status {@code 400 (Bad Request)} if the tipoCombustible has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-combustibles")
    public ResponseEntity<TipoCombustible> createTipoCombustible(@RequestBody TipoCombustible tipoCombustible) throws URISyntaxException {
        log.debug("REST request to save TipoCombustible : {}", tipoCombustible);
        if (tipoCombustible.getId() != null) {
            throw new BadRequestAlertException("A new tipoCombustible cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoCombustible result = tipoCombustibleRepository.save(tipoCombustible);
        return ResponseEntity.created(new URI("/api/tipo-combustibles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-combustibles} : Updates an existing tipoCombustible.
     *
     * @param tipoCombustible the tipoCombustible to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoCombustible,
     * or with status {@code 400 (Bad Request)} if the tipoCombustible is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoCombustible couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-combustibles")
    public ResponseEntity<TipoCombustible> updateTipoCombustible(@RequestBody TipoCombustible tipoCombustible) throws URISyntaxException {
        log.debug("REST request to update TipoCombustible : {}", tipoCombustible);
        if (tipoCombustible.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoCombustible result = tipoCombustibleRepository.save(tipoCombustible);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoCombustible.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-combustibles} : get all the tipoCombustibles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoCombustibles in body.
     */
    @GetMapping("/tipo-combustibles")
    public List<TipoCombustible> getAllTipoCombustibles() {
        log.debug("REST request to get all TipoCombustibles");
        return tipoCombustibleRepository.findAll();
    }

    /**
     * {@code GET  /tipo-combustibles/:id} : get the "id" tipoCombustible.
     *
     * @param id the id of the tipoCombustible to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoCombustible, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-combustibles/{id}")
    public ResponseEntity<TipoCombustible> getTipoCombustible(@PathVariable Long id) {
        log.debug("REST request to get TipoCombustible : {}", id);
        Optional<TipoCombustible> tipoCombustible = tipoCombustibleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoCombustible);
    }

    /**
     * {@code DELETE  /tipo-combustibles/:id} : delete the "id" tipoCombustible.
     *
     * @param id the id of the tipoCombustible to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-combustibles/{id}")
    public ResponseEntity<Void> deleteTipoCombustible(@PathVariable Long id) {
        log.debug("REST request to delete TipoCombustible : {}", id);
        tipoCombustibleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
