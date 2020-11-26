package com.mecanica.org.web.rest;

import com.mecanica.org.domain.EstadoAveria;
import com.mecanica.org.repository.EstadoAveriaRepository;
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
 * REST controller for managing {@link com.mecanica.org.domain.EstadoAveria}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EstadoAveriaResource {

    private final Logger log = LoggerFactory.getLogger(EstadoAveriaResource.class);

    private static final String ENTITY_NAME = "estadoAveria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoAveriaRepository estadoAveriaRepository;

    public EstadoAveriaResource(EstadoAveriaRepository estadoAveriaRepository) {
        this.estadoAveriaRepository = estadoAveriaRepository;
    }

    /**
     * {@code POST  /estado-averias} : Create a new estadoAveria.
     *
     * @param estadoAveria the estadoAveria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoAveria, or with status {@code 400 (Bad Request)} if the estadoAveria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-averias")
    public ResponseEntity<EstadoAveria> createEstadoAveria(@RequestBody EstadoAveria estadoAveria) throws URISyntaxException {
        log.debug("REST request to save EstadoAveria : {}", estadoAveria);
        if (estadoAveria.getId() != null) {
            throw new BadRequestAlertException("A new estadoAveria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoAveria result = estadoAveriaRepository.save(estadoAveria);
        return ResponseEntity.created(new URI("/api/estado-averias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-averias} : Updates an existing estadoAveria.
     *
     * @param estadoAveria the estadoAveria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoAveria,
     * or with status {@code 400 (Bad Request)} if the estadoAveria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoAveria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-averias")
    public ResponseEntity<EstadoAveria> updateEstadoAveria(@RequestBody EstadoAveria estadoAveria) throws URISyntaxException {
        log.debug("REST request to update EstadoAveria : {}", estadoAveria);
        if (estadoAveria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoAveria result = estadoAveriaRepository.save(estadoAveria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estadoAveria.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estado-averias} : get all the estadoAverias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoAverias in body.
     */
    @GetMapping("/estado-averias")
    public List<EstadoAveria> getAllEstadoAverias() {
        log.debug("REST request to get all EstadoAverias");
        return estadoAveriaRepository.findAll();
    }

    /**
     * {@code GET  /estado-averias/:id} : get the "id" estadoAveria.
     *
     * @param id the id of the estadoAveria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoAveria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-averias/{id}")
    public ResponseEntity<EstadoAveria> getEstadoAveria(@PathVariable Long id) {
        log.debug("REST request to get EstadoAveria : {}", id);
        Optional<EstadoAveria> estadoAveria = estadoAveriaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estadoAveria);
    }

    /**
     * {@code DELETE  /estado-averias/:id} : delete the "id" estadoAveria.
     *
     * @param id the id of the estadoAveria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-averias/{id}")
    public ResponseEntity<Void> deleteEstadoAveria(@PathVariable Long id) {
        log.debug("REST request to delete EstadoAveria : {}", id);
        estadoAveriaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
